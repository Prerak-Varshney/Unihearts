import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from 'react-native-swiper';
import { useLocalSearchParams, router } from 'expo-router';

import { postGenderDetails}  from '@/api/userDetails';

const Gender = () => {
    const { email } = useLocalSearchParams(); 

    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isLastSlide = activeIndex === 1;

    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedPreference, setSelectedPreference] = useState(null);

    const selectGender = (gender) => {
        setSelectedGender(gender);
    };

    const selectPreference = (preference) => {
        setSelectedPreference(preference);
    };

    const getGenderDetails = async() => {
        if(selectedGender && selectedPreference && email){
            const response = await postGenderDetails(email, selectedGender, selectedPreference);
            router.replace({
                pathname: './profile',
                params: { email },
            });
            console.log(response);
        }
    }
    

    return (
        <SafeAreaView className="flex-1 w-full h-full bg-white justify-evenly items-center flex flex-col">
            <Swiper
                ref={swiperRef}
                loop={false}
                dot={<View className='w-3 h-3 bg-pink-100 rounded-full m-1' />} 
                activeDot={<View className='w-3 h-3 bg-black rounded-full m-1' />}
                onIndexChanged={(index) => setActiveIndex(index)}
            >
                <View className='flex-1 w-full h-full bg-white flex flex-col items-center justify-center'>
                    <View className='w-full h-1/5'>
                        <Text className='text-black text-center font-bold text-3xl'>I Identify as</Text>
                    </View>
                    <View className='w-full h-1/4 bg-white flex flex-col items-center justify-evenly'>
                        {/* Button for "Man" */}
                        <TouchableOpacity 
                            className='w-4/5 h-12 rounded-2xl border border-gray-200 flex justify-center items-center' 
                            style={{
                                backgroundColor: selectedGender === 'Man' ? 'black' : 'white',
                            }} 
                            onPress={() => selectGender('Man')}
                        >
                            <Text className='font-semibold text-lg' 
                                style={{ color: selectedGender === 'Man' ? 'white' : 'black' }}>
                                Man
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            className='w-4/5 h-12 rounded-2xl flex justify-center items-center border border-gray-200' 
                            style={{
                                backgroundColor: selectedGender === 'Woman' ? 'black' : 'white',
                            }} 
                            onPress={() => selectGender('Woman')}
                        >
                            <Text className='font-semibold text-lg' 
                                style={{ color: selectedGender === 'Woman' ? 'white' : 'black' }}>
                                Woman
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            className='w-4/5 h-12 rounded-2xl flex justify-center items-center border border-gray-200' 
                            style={{
                                backgroundColor: selectedGender === 'Other' ? 'black' : 'white',
                            }} 
                            onPress={() => selectGender('Other')}
                        >
                            <Text className='font-semibold text-lg' 
                                style={{ color: selectedGender === 'Other' ? 'white' : 'black' }}>
                                Other
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='flex-1 w-full h-full bg-white flex flex-col items-center justify-center'>
                    <View className='w-full h-1/5'>
                        <Text className='text-black text-center font-bold text-3xl'>I Prefer</Text>
                    </View>
                    <View className='w-full h-1/4 bg-white flex flex-col items-center justify-evenly'>
                        {/* Button for "Man" */}
                        <TouchableOpacity 
                            className='w-4/5 h-12 rounded-2xl border border-gray-200 flex justify-center items-center' 
                            style={{
                                backgroundColor: selectedPreference === 'Man' ? 'black' : 'white',
                            }} 
                            onPress={() => selectPreference('Man')}
                        >
                            <Text className='font-semibold text-lg' 
                                style={{ color: selectedPreference === 'Man' ? 'white' : 'black' }}>
                                Man
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            className='w-4/5 h-12 rounded-2xl flex justify-center items-center border border-gray-200' 
                            style={{
                                backgroundColor: selectedPreference === 'Woman' ? 'black' : 'white',
                            }} 
                            onPress={() => selectPreference('Woman')}
                        >
                            <Text className='font-semibold text-lg' 
                                style={{ color: selectedPreference === 'Woman' ? 'white' : 'black' }}>
                                Woman
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            className='w-4/5 h-12 rounded-2xl flex justify-center items-center border border-gray-200' 
                            style={{
                                backgroundColor: selectedPreference === 'Both' ? 'black' : 'white',
                            }} 
                            onPress={() => selectPreference('Both')}
                        >
                            <Text className='font-semibold text-lg' 
                                style={{ color: selectedPreference === 'Both' ? 'white' : 'black' }}>
                                Both
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Swiper>

            <TouchableOpacity 
                className='bg-black w-4/5 h-12 rounded-2xl flex justify-center items-center mb-5' 
                onPress={() => isLastSlide ? getGenderDetails() : swiperRef.current?.scrollBy(1, true)}
            >
                <Text className='text-white font-semibold text-lg'>{isLastSlide ? "Confirm" : "Continue"}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Gender;
