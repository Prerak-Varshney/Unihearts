import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import WheelPicker from '@quidone/react-native-wheel-picker';
import { postHeightDetails } from "@/api/userDetails";
import axios from 'axios';
import Loading from '../../components/Loading';

const Height = () => {
    const { email } = useLocalSearchParams(); 
    const [height, setHeight] = useState(5.7);
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
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        fetchMyProfile();
    }, []);

    const fetchMyProfile = async() => {
        try{
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/get-profiles/get-my-profile`, {email: email});

            const data = response.data.user;
            setProfile(data);
            setHeight(parseFloat(data.height));

        }catch(error:any){
            if (error.response) {
                console.log("Error:", error.response.data.message);
            } else {
                console.log("Error:", error.message);
            }
        }
    }

    const heights = [];
    for (let feet = 3; feet <= 7; feet++) {
        for (let inches = 0; inches < 12; inches++) {
            heights.push({
                value: `${feet}.${inches}`,
                label: `${feet}'${inches}"`
            });
        }
    }

    const heightConfirm = async() => {
        setIsLoading(true);
        console.log(height);
        const response = await postHeightDetails(email, height);
        router.replace({
            pathname: './editProfile',
            params: { email },
        });
        setIsLoading(false);
        console.log(response);
    }

    return (
        <SafeAreaView className="flex-1 w-full h-full bg-white justify-evenly items-center flex flex-col">
            {isLoading ? <Loading /> : 
            <View className="flex-1 w-full h-full bg-white justify-evenly items-center flex flex-col">
                <View className="w-4/5 flex flex-col gap-2">
                    <Text className="flex flex-row justify-start items-center text-3xl font-bold text-black text-center">How tall are you?</Text>
                    <Text className="flex flex-row justify-start items-center text-lg font-semibold text-gray-400 text-center">Always visible on profile</Text>
                </View>

                <View className="w-4/5 flex flex-col gap-2">
                    <Text className="flex flex-row justify-start items-center text-2xl font-semibold text-black text-center">(Feets)</Text>

                    <WheelPicker
                        data={heights}
                        onValueChanged={({item: {value}}) => setHeight(parseFloat(value))}
                        value={profile?.height}
                    />
                </View>

                <View className="w-full justify-end items-center flex flex-col">
                    <TouchableOpacity className='bg-black w-4/5 h-12 rounded-2xl flex justify-center items-center' onPress={() => {heightConfirm()}}>
                        <Text className='text-white font-semibold text-sm'>Edit Height</Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
        </SafeAreaView>
    );
};

export default Height;

