import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import NarcoticsComponent from "@/components/NarcoticsComponent";
import { postNarcoticsDetails } from "@/api/userDetails";
import axios from 'axios';
import Loading from '../../components/Loading';

const editNarcotics = () => {
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

    const [isSmoke, setIsSmoke] = useState<boolean>(false)
    const [isDrink, setIsDrink] = useState<boolean>(false)
    const [isWeed, setIsWeed] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    useEffect(() => {
        fetchMyProfile();
    }, []);

    const fetchMyProfile = async() => {
        try{
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/get-profiles/get-my-profile`, {email: email});

            
            const data = response.data.user;
            setIsSmoke(data.narcotics.smoke);
            setIsDrink(data.narcotics.drink);
            setIsWeed(data.narcotics.weed);
            // console.log(data);

        }catch(error:any){
            if (error.response) {
                console.log("Error:", error.response.data.message);
            } else {
                console.log("Error:", error.message);
            }
        }
    }

    const narcoticsConfirm = async() => {
        console.log(email, isSmoke, isDrink, isWeed);
        const response = await postNarcoticsDetails(email, isSmoke, isDrink, isWeed);
        router.replace({
            pathname: './editProfile',
            params: { email },
        })
        console.log(response);
    }

    return(
        <SafeAreaView className="flex-1 w-full h-full bg-white justify-evenly items-center flex flex-col">
            {isLoading ? <Loading /> : 
            <View className="flex-1 w-full h-full bg-white justify-evenly items-center flex flex-col">
                <Text className="w-4/5 flex flex-row justify-start items-center text-3xl font-bold text-black text-center">Do you?</Text>

                {/* Smoke */}
                <NarcoticsComponent 
                    substance="Smoke" 
                    isSubstance={isSmoke} 
                    setIsSubstance={setIsSmoke} 
                />

                {/* Drink */}
                <NarcoticsComponent 
                    substance="Drinks" 
                    isSubstance={isDrink} 
                    setIsSubstance={setIsDrink} 
                />

                {/* Weed */}
                <NarcoticsComponent 
                    substance="Cannabis" 
                    isSubstance={isWeed} 
                    setIsSubstance={setIsWeed} 
                />

                <View className="w-full justify-end items-center flex flex-col">
                    <TouchableOpacity className='bg-black w-4/5 h-12 rounded-2xl flex justify-center items-center' onPress={() => {narcoticsConfirm()}}>
                        <Text className='text-white font-semibold text-sm'>Edit Vices</Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
            
        </SafeAreaView>
    )
}

export default editNarcotics;