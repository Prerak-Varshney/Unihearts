import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Platform, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { postPromptsDetails } from '@/api/userDetails';

const WritePrompts = () => {
    const { email, selectedPrompts } = useLocalSearchParams(); 
    const prompts = selectedPrompts ? JSON.parse(selectedPrompts) : [];

    const [answers, setAnswers] = useState(Array(prompts.length).fill('')); 

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const isEmpty = answers.some(answer => answer.trim() === '');
        setIsButtonDisabled(isEmpty);
    }, [answers]);  

    const sendAnswers = async() => {
        const formattedAnswers = answers.map(answer => answer.replace(/[\n\r]+/g, ' ').trim());

        console.log(formattedAnswers);

        const response = await postPromptsDetails(
            email, 
            prompts[0],
            prompts[1],
            prompts[2],
            formattedAnswers[0],
            formattedAnswers[1],
            formattedAnswers[2]
        );

        if(response.success){
            return router.replace({
                pathname: '../(main)/home',
                params: { email }
            });
        }
        console.log(response.message);
        return response.message;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <SafeAreaView className='w-full h-full bg-white'>
                    <StatusBar style="dark" />
                    
                    <View className='w-full h-20 flex justify-center items-center'>
                        {/* TODO: Return to choose prompts */}
                        <Text className="text-3xl font-bold text-black text-center">Your Creative Answers</Text>
                    </View>

                    <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center', gap:50}}>
                        {prompts.map((selectedPrompt, index) => (
                            <View key={index} className='w-full flex justify-center items-center'>
                                <View className={`w-4/5 h-16 flex flex-row justify-start items-center rounded-lg`}>
                                    <Text className='text-lg font-semibold text-black'>{selectedPrompt}</Text>
                                </View>

                                <TextInput
                                    className={`w-4/5 h-24 text-start border border-gray-300 rounded-lg pl-2 pt-4`}
                                    placeholder='Add your creative answer here...'
                                    placeholderTextColor={"grey"}
                                    multiline={true}
                                    textAlignVertical="top"
                                    value={answers[index]}
                                    onChangeText={(text) => {
                                        const newAnswers = [...answers];
                                        newAnswers[index] = text;
                                        setAnswers(newAnswers);
                                    }}
                                    cursorColor={'black'}
                                    maxLength={70} 
                                />

                            </View>
                        ))}
                        
                        <View className={`w-full justify-end items-center flex flex-col mb-4`}>
                            <TouchableOpacity 
                                className={`w-4/5 h-12 rounded-2xl flex justify-center items-center ${isButtonDisabled ? 'bg-gray-300' : 'bg-black'}`} 
                                onPress={() => {sendAnswers()}}
                                disabled={isButtonDisabled}  
                            >
                                <Text className='text-white font-semibold text-sm'>Finish</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                                        
                </SafeAreaView>

            
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default WritePrompts; 