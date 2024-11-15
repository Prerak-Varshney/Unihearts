import { useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import * as Network from 'expo-network';
// import { useEffect } from 'react';
// import { router } from 'expo-router';

const NoNetwork = ({retry}) => {
    return(
        <SafeAreaView className='w-screen h-screen bg-white flex justify-evenly items-center absolute top-7 left-0 z-[999999]'>
            <Text className='text-black text-2xl font-bold'>No Network Connection</Text>
            <Image source={require('../../assets/Images/Unihearts_Logo.jpeg')} className='w-40 h-40'/>
            <Text className='text-black text-center text-base font-bold'>Please check your internet connection and try again.</Text>

            <TouchableOpacity className='w-28 h-10 flex justify-center items-center bg-black rounded-lg' onPress={retry}>
                <Text className='text-white text-center text-base'>Retry</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default NoNetwork;