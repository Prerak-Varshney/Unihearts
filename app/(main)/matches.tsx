import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';

import BottomNavigator from "@/components/BottomNavigator";
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Loading from '@/components/Loading';
import SubscriptionRedirectComponent from '@/components/subscriptionRedirectComponent';

const Matches = () => {
    const { email } = useLocalSearchParams();

    interface Profile {
        _id: string;
        images: {
            profilePic: string;
        };
        fullName: string;
        email: string;
    }

    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [inSubscription, setInSubscription] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        getLikedYouProfiles();
    }, [])

    const getLikedYouProfiles = async () => {
        setIsLoading(true)
        try{
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/get-profiles/get-liked-you-profiles`, { email });

            if(response.data.subscriptionPlan === 'Premium'){
                setInSubscription(true);
            }else{
                setInSubscription(false);
            }

            setProfiles(response.data.likedYouProfiles);

        } catch (error:any){
            if(error.response) {
                console.log("Error:", error.response.data.message);
            }else{
                console.log("Error:", error.message);
            }
        } finally{
            setIsLoading(false)
        }
    }

    const openLikedYouProfile = async(profileEmail:string, index) => {
        router.push({
            pathname: './likedYouProfileVisit',
            params: {profileEmail: profileEmail, userEmail: email}
        })  
    }
    
    return(
        <SafeAreaView className='w-full h-full bg-white'>
            <BottomNavigator value={email}/>
            <StatusBar style="dark" />
            {isLoading && ( <Loading /> )}
            {!inSubscription && ( <SubscriptionRedirectComponent email={email} subscriptionType='Premium Subscription Required' /> )}

            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', backgroundColor: 'white' }}>
                <Text className="w-4/5 flex flex-row justify-start items-center text-3xl font-bold text-black text-center my-10">See Who Liked You</Text>
                {profiles.length > 0 ? (
                    profiles.map((profile, index) => (
                        <TouchableOpacity key={profile._id} className={`w-full h-20 flex flex-row justify-start items-center mb-1 pl-6`} onPress={() => {openLikedYouProfile(profile.email, index)}}>
                            <View className='h-full w-auto flex justify-center items-center mr-6'>
                                <Image source={{ uri: profile.images.profilePic }} className='w-16 h-16 rounded-full' />
                            </View>
                            <View className={`flex-1 h-full py-2 ${index === 0 ? 'border-y border-y-gray-300' : 'border-b border-b-gray-300'}`}>
                                <Text className='text-black text-base' >{profile.fullName}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ): (<Text className='text-black text-base font-semibold'>Nothing to show</Text>)}

            </ScrollView>
        </SafeAreaView>
    )
}

export default Matches;