import { useRef, useState } from 'react';

import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { StatusBar } from 'expo-status-bar';

import { router } from 'expo-router';
import { onboarding } from '@/constants/index';
// import CustomButton from '@/components/CustomButton';

export default function OnBoarding() {

    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0)
    const isLastSlide = activeIndex === onboarding.length - 1;
    const isMidSlide = activeIndex === onboarding.length - 2;

    const getButtonText = () => {
        if(isLastSlide){
            return "Create an account"
        }else if(isMidSlide){
            return "Continue"
        }else{
            return "That's Great"
        }
    }

    return (

        <SafeAreaView className="w-full h-full flex flex-col justify-evenly items-center bg-white">
            <StatusBar style="dark" />
            <TouchableOpacity
                className='w-full flex justify-end items-end p-5'
                onPress={() => {router.replace("/(auth)/signup")}}
            >
                <Text className='text-black text-md font-semibold'>Skip</Text>
            </TouchableOpacity>

            <View className='flex-1'>
                <Swiper 
                    ref={swiperRef} 
                    loop={false} 
                    dot={<View className='w-3 h-3 bg-pink-100 rounded-full m-1'/>} 
                    activeDot={<View className='w-3 h-3 bg-black rounded-full m-1'/>}
                    onIndexChanged={(index) => setActiveIndex(index)}
                    >
                        {onboarding.map((item) => (
                            <View key={item.id} className="flex items-center justify-center p-5">
                                <Image source={item.image} className="w-full h-[300px]" resizeMode='contain'/>
                                
                                <View className='flex flex-row items-center justify-center'>
                                    <Text className='text-black text-2xl font-extrabold text-center mx-12 mt-12'>{item.title}</Text>
                                </View>
                            
                                <Text className='text-black text-sm font-semibold text-center mx-12 mt-6'>{item.description}</Text>
                            </View>
                        ))}
                </Swiper>
            </View>
            
            <TouchableOpacity className='bg-black w-4/5 h-12 rounded-2xl flex justify-center items-center mb-5' onPress={() => isLastSlide ? router.replace("/(auth)/signup") : swiperRef.current?.scrollBy(1, true)}>
                <Text className='text-white font-semibold text-lg'>{getButtonText()}</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}
