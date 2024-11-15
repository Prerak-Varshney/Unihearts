import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from 'react-native-swiper';
import { useLocalSearchParams, router } from 'expo-router';
import { postGenderDetails}  from '@/api/userDetails';
import axios from 'axios';
import Loading from '../../components/Loading';
const Gender = () => {
    const { email } = useLocalSearchParams(); 

    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedPreference, setSelectedPreference] = useState(null);
    const [isLoading, setIsLoading] = useState<Boolean>(false);

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

    useEffect(() => {
        fetchMyProfile();
    }, []);

    const fetchMyProfile = async() => {
        try{
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/get-profiles/get-my-profile`, {email: email});

            const data = response.data.user;
            setSelectedGender(data.gender);
            setSelectedPreference(data.sexualOrientation);

        }catch(error:any){
            if (error.response) {
                console.log("Error:", error.response.data.message);
            } else {
                console.log("Error:", error.message);
            }
        }
    }

    const selectPreference = (preference) => {
        setSelectedPreference(preference);
    };

    const getGenderDetails = async() => {
        setIsLoading(true);
        if(selectedGender && selectedPreference && email){
            const response = await postGenderDetails(email, selectedGender, selectedPreference);
            router.replace({
                pathname: './editProfile',
                params: { email },
            });
            console.log(response);
        }
        setIsLoading(false);
    }
    

    return (
        <SafeAreaView className="flex-1 w-full h-full bg-white justify-evenly items-center flex flex-col">
            {isLoading ? <Loading /> : 
            <View className="flex-1 w-full h-full bg-white justify-evenly items-center flex flex-col">
                <View className='w-full'>
                    <Text className='text-black text-center font-bold text-3xl'>I Prefer</Text>
                </View>
                <View className='w-full h-1/4 bg-white flex flex-col items-center justify-evenly'>
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

                <TouchableOpacity 
                    className='bg-black w-4/5 h-12 rounded-2xl flex justify-center items-center mb-5' 
                    onPress={() => getGenderDetails()}
                >
                    <Text className='text-white font-semibold text-lg'>{"Edit Orientation"}</Text>
                </TouchableOpacity>
            </View>
        }
        </SafeAreaView>
    );
};

export default Gender;
