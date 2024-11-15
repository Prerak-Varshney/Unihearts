import { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard, TextInput, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import BottomNavigator from "@/components/BottomNavigator";
import { router, useLocalSearchParams } from "expo-router";
import WheelPicker from '@quidone/react-native-wheel-picker';
import { SelectCountry } from 'react-native-element-dropdown';
import axios from 'axios';

import AntDesign from '@expo/vector-icons/AntDesign';


const EditProfile = () => {
    const { email } = useLocalSearchParams();

    interface Profile {
        profilePic: string;
        firstName: string;
        lastName: string; 
        birthday: string;
        gender: string;
        sexualOrientation: string;
        height: string;
        college: string;
        course: string;
        year: string;
        images: {
            profilePic: string;
            image1: string;
            image2: string;
            image3: string;
            image4: string;
            image5: string;
        };
        narcotics: {
            smoke: boolean;
            drink: boolean;
            weed: boolean;
        };
    }
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        fetchMyProfile();
    }, []);

    const fetchMyProfile = async() => {
        try{
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/get-profiles/get-my-profile`, {email: email});

            const data = response.data.user;
            setProfile(data);

        }catch(error:any){
            if (error.response) {
                console.log("Error:", error.response.data.message);
            } else {
                console.log("Error:", error.message);
            }
        }
    }

    const editImages = () => {
        router.replace({
            pathname: './editImages',
            params: {email: email},
        })
    }

    const editVices = () => {
        router.replace({
            pathname: './editVices',
            params: {email: email},
        })
    }

    const editPrompts = () => {
        router.replace({
            pathname: './editPrompts',
            params: {email: email},
        })
    }

    const editProfile = () => {
        router.replace({
            pathname: './editProfileDetails',
            params: {email: email},
        })
    }

    const editHeight = () => {
        router.replace({
            pathname: './editHeight',
            params: {email: email},
        })
    }

    const editOrientation = () => {
        router.replace({
            pathname: './editOrientation',
            params: {email: email},
        })
    }

    return (
        <SafeAreaView className="bg-white w-full h-full flex justify-start items-center">
            <StatusBar style="dark"/>
            <BottomNavigator value={email}/>
            <View className="w-4/5 h-20 flex flex-col justify-center items-center">
                <Text className="text-black font-bold text-2xl">Edit Your Profile</Text>
            </View>

            <View className="w-4/5 h-10 flex flex-row justify-between items-center mt-10">
                <View className='w-4/5 h-full flex justify-center items-start'>
                    <Text className='text-black font-semibold text-lg'>Edit Profile</Text>
                </View>
                <TouchableOpacity className='flex-1 h-full flex justify-center items-end' onPress={editProfile}>
                    <AntDesign 
                        name="edit" size={16} 
                        color="black" 
                    /> 
                </TouchableOpacity>
            </View>

            <View className="w-4/5 h-10 flex flex-row justify-between items-start mt-10">
                <View className='w-4/5 h-full flex justify-center items-start'>
                    <Text className='text-black font-semibold text-lg'>Edit Height</Text>
                </View>
                <TouchableOpacity className='flex-1 h-full flex justify-center items-end' onPress={editHeight}>
                    <AntDesign 
                        name="edit" size={16} 
                        color="black" 
                    /> 
                </TouchableOpacity>
            </View>

            <View className="w-4/5 h-10 flex flex-row justify-between items-start mt-10">
                <View className='w-4/5 h-full flex justify-center items-start'>
                    <Text className='text-black font-semibold text-lg'>Edit Orientation</Text>
                </View>
                <TouchableOpacity className='flex-1 h-full flex justify-center items-end' onPress={editOrientation}>
                    <AntDesign 
                        name="edit" size={16} 
                        color="black" 
                    /> 
                </TouchableOpacity>
            </View>

            <View className="w-4/5 h-10 flex flex-row justify-between items-start mt-10">
                <View className='w-4/5 h-full flex justify-center items-start'>
                    <Text className='text-black font-semibold text-lg'>Edit Vices</Text>
                </View>
                <TouchableOpacity className='flex-1 h-full flex justify-center items-end' onPress={editVices}>
                    <AntDesign 
                        name="edit" size={16} 
                        color="black" 
                    /> 
                </TouchableOpacity>
            </View>

            <View className="w-4/5 h-10 flex flex-row justify-between items-start mt-10">
                <View className='w-4/5 h-full flex justify-center items-start'>
                    <Text className='text-black font-semibold text-lg'>Edit Images</Text>
                </View>
                <TouchableOpacity className='flex-1 h-full flex justify-center items-end' onPress={editImages}>
                    <AntDesign 
                        name="edit" size={16} 
                        color="black" 
                    /> 
                </TouchableOpacity>
            </View>

            <View className="w-4/5 h-10 flex flex-row justify-between items-start mt-10">
                <View className='w-4/5 h-full flex justify-center items-start'>
                    <Text className='text-black font-semibold text-lg'>Edit Prompts</Text>
                </View>
                <TouchableOpacity className='flex-1 h-full flex justify-center items-end' onPress={editPrompts}>
                    <AntDesign 
                        name="edit" size={16} 
                        color="black" 
                    /> 
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default EditProfile