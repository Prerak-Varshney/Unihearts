import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import BottomNavigator from "@/components/BottomNavigator";
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

import Loading from '@/components/Loading';
import SubscriptionRedirectComponent from '@/components/subscriptionRedirectComponent';


const Chats = () => {
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
    const [userId, setUserId] = useState<string>('');
    const [inSubscription, setInSubscription] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getYourMatchProfiles();
    }, [])

    const getYourMatchProfiles = async () => {
        setIsLoading(true)
        try{
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/get-profiles/get-all-your-matches-profiles`, { email });

            if(response.data.subscriptionPlan === 'Premium'){
                setInSubscription(true);
            }else{
                setInSubscription(false);
            }

            setProfiles(response.data.allYourMatches);
            setUserId(response.data.userId);

        } catch (error:any){
            if(error.response) {
                console.log("Error:", error.response.data.message);
                return error.response.data;
            }else{
                console.log("Error:", error.message);
            }
        } finally{
            setIsLoading(false)
        }
    }

    const openYourMatchProfiles = (email:string, chatId:string, currentUserId:string, otherUserId:string, otherUserProfilePic:string, otherUserFullName:string, otherUserEmail:string) => {
        router.replace({
            pathname: './chatScreen',
            params: {email, chatId, currentUserId, otherUserId, otherUserProfilePic, otherUserFullName, otherUserEmail}
        })
    }

    
    return(
        <SafeAreaView className='w-full h-full bg-white'>
            <BottomNavigator value={email}/>
            <StatusBar style="dark" />
            {isLoading && ( <Loading /> )}
            {!inSubscription && ( <SubscriptionRedirectComponent email={email} subscriptionType='Basic Subscription Required' /> )}

            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', backgroundColor: 'white' }}>
                <Text className="w-4/5 flex flex-row justify-start items-center text-3xl font-bold text-black text-center my-10">Your Matches</Text>
                {profiles.length > 0 ? (
                    profiles.map((profile, index) => (

                        <TouchableOpacity key={profile._id} className={`w-full h-20 flex flex-row justify-start items-center mb-1 pl-6`} onPress={() => {openYourMatchProfiles(
                            email, 
                            ([userId, profile._id].sort().join('_')), 
                            userId, 
                            profile._id, 
                            profile.images.profilePic, 
                            profile.firstName, 
                            profile.email)}}>
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

export default Chats;