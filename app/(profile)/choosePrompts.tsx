import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { promptsData } from '@/constants/promptsData';
import ChoosePromptComponent from '@/components/ChoosePromptComponent';

const ChoosePrompts = () => {
    const { email } = useLocalSearchParams(); 

    const [selectedPrompts, setSelectedPrompts] = useState(Array(promptsData.length).fill(false)); 

    const[areAllPromptsSelected, setAreAllPromptsSelected] = useState(false);

    const selectPromptFunction = (index) => {
        setSelectedPrompts(prev => {
            const updatedSelection = [...prev];
            const selectedCount = prev.filter(Boolean).length;
            
            if (selectedCount < 3 || prev[index]) {
                updatedSelection[index] = !prev[index];
            }

            setAreAllPromptsSelected(updatedSelection.filter(Boolean).length === 3);

            return updatedSelection;
        });
    };

    const selectPromptsAndRedirect = () => {
        const selected = promptsData.filter((_, index) => selectedPrompts[index]);
        if (selected.length === 3) {
            setAreAllPromptsSelected(true);
            router.push({
                pathname: '/writePrompts',
                params: {
                    email: email,
                    selectedPrompts: JSON.stringify(selected.map(p => p.prompt))
                }
            });
        } else {
            setAreAllPromptsSelected(false)
        }

    }

    return(
        <SafeAreaView className='w-full h-full bg-white'>
            <StatusBar style="dark" />
            <View className='w-full h-20 flex justify-center items-center'>
                <Text className="text-3xl font-bold text-black text-center">Choose prompts (any 3)</Text>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', gap: 4 }}>    
                {promptsData.map((prompt, index) => (
                    <ChoosePromptComponent
                        key={prompt.id}
                        otherClassNames=''
                        isPromptSelected={selectedPrompts[index]}
                        setIsPromptSelected={() => selectPromptFunction(index)}
                        prompt={prompt.prompt}
                    />
                ))}
                <View className='w-full h-10 flex justify-center items-center'/>
                    
            </ScrollView>

            <View className={`w-full justify-end items-center flex flex-col mb-4`}>
                <TouchableOpacity 
                    className={`w-4/5 h-12 rounded-2xl flex justify-center items-center ${areAllPromptsSelected ? 'bg-black' : 'bg-gray-300'}`} 
                    onPress={() => {selectPromptsAndRedirect()}}
                    disabled={!areAllPromptsSelected}
                >
                    <Text className='text-white font-semibold text-sm'>{areAllPromptsSelected ? 'Select' : 'Select any 3'}</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default ChoosePrompts