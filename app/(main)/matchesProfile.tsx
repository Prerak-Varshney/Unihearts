import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';

import { SafeAreaView } from "react-native-safe-area-context";
import {useLocalSearchParams} from 'expo-router';

import { DetailsScrollViewComponent, AfterScrollBarDetailsComponent, ImageComponent } from '@/components/HomeComponents';
import Loading from '@/components/Loading';
import BottomNavigator from "@/components/BottomNavigator";

import axios from 'axios'

const MyProfile = () => {

    const { email, matchProfileEmail } = useLocalSearchParams();

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
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    useEffect(() => {
        fetchMyProfile();
    }, []);

    const fetchMyProfile = async() => {
        setIsLoading(true);
        try{
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/get-profiles/get-my-profile`, {email: matchProfileEmail});

            const data = response.data.user;
            setProfile(data);

            return setIsLoading(false);

        }catch(error){
            if (error.response) {
                setIsLoading(false);
                console.error("Error:", error.response.data.message);
            } else {
                setIsLoading(false);
                console.error("Error:", error.message);
            }
        }
        
    }

    return (
        <SafeAreaView className="bg-white w-full h-full">
            <StatusBar style="dark"/>
            <BottomNavigator value={email}/>
            {profile ? (
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', backgroundColor: 'white' }}>
                    
                    <View className="w-full h-96">
                        <Image source={{ uri: profile.images.profilePic }} className="w-full h-full" resizeMode="cover" />
                    </View>

                    <View className="w-[90%] flex flex-row my-6">
                        <Text className="text-black font-semibold text-2xl italic">{profile.firstName} {profile.lastName}</Text>
                    </View>

                    <View className="w-[90%]">
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <DetailsScrollViewComponent 
                                value={profile.age} 
                                iconName='birthday-cake' 
                                iconSource='FontAwesome'
                            />
                            <DetailsScrollViewComponent 
                                value={profile.gender} 
                                iconName='gender-male-female' 
                                iconSource={'MaterialCommunityIcons'}
                            />
                            <DetailsScrollViewComponent 
                                value={profile.sexualOrientation} 
                                iconName='magnet' 
                                iconSource='FontAwesome'
                            />
                            <DetailsScrollViewComponent 
                                value={profile.height} 
                                iconName='human-male-height' iconSource='MaterialCommunityIcons'
                            />
                            <DetailsScrollViewComponent
                                value={''}
                                iconName={profile.narcotics.smoke ? 'cigar' : 'cigar-off' }
                                iconSource='MaterialCommunityIcons'
                            />
                            <DetailsScrollViewComponent 
                                value={''} 
                                iconName={profile.narcotics.drink ? 'drink' : 'no-drinks'} 
                                iconSource={profile.narcotics.drink ? 'Entypo' : 'MaterialIcons'}
                            />
                            <DetailsScrollViewComponent 
                                value={''}
                                iconName={profile.narcotics.weed ? 'cannabis' : 'cannabis-off'} 
                                iconSource='MaterialCommunityIcons' 
                            />
                        </ScrollView>
                    </View>

                    <View className="w-[90%] flex my-6">
                        <AfterScrollBarDetailsComponent 
                            value={profile.college}
                            iconName='university' 
                            iconSource='FontAwesome'
                        />
                        <AfterScrollBarDetailsComponent 
                            value={profile.course}
                            iconName='open-book' 
                            iconSource='Entypo'
                        />
                        {/* <AfterScrollBarDetailsComponent value="Dancing" />
                        <AfterScrollBarDetailsComponent value="Goals" /> */}

                    </View>

                    <View className="w-[90%] mt-6 mb-3">
                        <Text className="text-gray-500 font-semibold text-xl italic">{profile.prompts.prompt1} ?</Text>
                    </View>

                    <View className="w-[90%] mb-6">
                        <Text className="text-black font-normal text-lg italic">{profile.prompts.answer1}</Text>
                    </View>

                    <ImageComponent uri={profile.images.profilePic}/>
                    <ImageComponent uri={profile.images.image1}/>

                    <View className="w-[90%] mt-6 mb-3">
                        <Text className="text-gray-500 font-semibold text-xl italic">{profile.prompts.prompt2} ?</Text>
                    </View>

                    <View className="w-[90%] mb-6">
                        <Text className="text-black font-normal text-lg italic">{profile.prompts.answer2}</Text>
                    </View>

                    <ImageComponent uri={profile.images.image2}/>
                    <ImageComponent uri={profile.images.image3}/>

                    <View className="w-[90%] mt-6 mb-3">
                        <Text className="text-gray-500 font-semibold text-xl italic">{profile.prompts.prompt3} ?</Text>
                    </View>

                    <View className="w-[90%] mb-6">
                        <Text className="text-black font-normal text-lg italic">{profile.prompts.answer3}</Text>
                    </View>

                    <ImageComponent uri={profile.images.image4}/>
                    <ImageComponent uri={profile.images.image5}/>
                </ScrollView>
            ) : (
                <Text>No profile available</Text>
            )}
            {isLoading && <Loading/>} 
        </SafeAreaView>
    );
}

export default MyProfile;
