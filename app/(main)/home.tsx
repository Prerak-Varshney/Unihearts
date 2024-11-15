import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SafeAreaView } from "react-native-safe-area-context";
import {useLocalSearchParams, router} from 'expo-router';

import { DetailsScrollViewComponent, AfterScrollBarDetailsComponent, ImageComponent } from '@/components/HomeComponents';
import Loading from '@/components/Loading';
import BottomNavigator from "@/components/BottomNavigator";

import { StatusBar } from "expo-status-bar";

import axios from 'axios'


const Home = () => {
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

    const [profile, setProfile] = useState<Profile | null>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [noProfile, setNoProfile] = useState<boolean>(false);
    const [profileMatch, setProfileMatch] = useState<boolean>(false);
    const [count, setCount] = useState(0);
    const [inTrial, setInTrial] = useState(true);

    useEffect(() => {
        getFirstProfile();        
    }, []);

    const postSwipeLimit = async(newCount) => {

        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/get-profiles/set-swipe-limit`, { email, swipeCount: newCount });

        try{
            if(response.data.success){
                if(response.data.plan !== 'Free'){
                    setInTrial(true);
                }else{
                    setCount(response.data.count);
                    setInTrial(response.data.trial);
                }
            }

        } catch(error:any){
            console.log("Error in trial", error);
        }
    }

    const getFirstProfile = async() => {
        setIsLoading(true);
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/get-profiles/get-first-profile`, { email });

        try{
            if (response.data.success) {
                setNoProfile(false);
                setProfile(response.data.firstProfile);

                if(response.data.plan !== 'Free'){
                    setInTrial(true);
                }else{
                    setCount(response.data.count);
                    setInTrial(response.data.trial);
                }
            }else{
                setNoProfile(true);
            }
        } catch(error:any){
            console.log("Error:", error.response?.data || error.message);
            setNoProfile(true);
        } finally {
            setIsLoading(false);
        }
    }

    const swipeForLike = async(userEmail, profileEmail) => {
        setProfileMatch(false);
        let newCount = count + 1;
        postSwipeLimit(newCount);

        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/get-profiles/swipe-for-like`, { email: userEmail, profileEmail });

        try{
            if (response.data.success) {
                if(response.data.isMatch){
                    setProfileMatch(true);
                }
                getFirstProfile();
            }
        } catch(error:any){
            console.log("Error:", error.response?.data || error.message);
            setNoProfile(true);
        } 
    }

    const swipeForDislike = async(userEmail, profileEmail) => {
        let newCount = count + 1;
        postSwipeLimit(newCount);

        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/get-profiles/swipe-for-dislike`, { email: userEmail, profileEmail })

        try{
            if (response.data.success) {
                setNoProfile(false);
                getFirstProfile();
            }else{
                setNoProfile(true);
            }

        } catch(error:any){
            console.log("Error:", error.response?.data || error.message);
            setNoProfile(true); 
        }
    }

    const bringBackDislikedProfiles = async() => {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/get-profiles/bring-back-disliked-profiles`, { email });

        try{
            if (response.data.success) {
                getFirstProfile();
                console.log(response.data);
            }
        }catch(error){
            console.log(response.data.error);
        }
    }

    return (
        <SafeAreaView className="bg-white w-full h-full">
            <StatusBar style="dark" />
            <BottomNavigator value={email} />

            {isLoading && <Loading />}

            {profileMatch && <View className='w-screen h-screen bg-white flex justify-evenly items-center'>
                <Text className='text-3xl font-bold'>HURREY!!! Match found...</Text>

                <Image source={require('../../assets/Images/Unihearts_Logo.jpeg')} className='w-40 h-40'/>

                <View className="w-full justify-end items-center flex flex-col">
                    <TouchableOpacity
                        className='bg-black w-4/5 h-12 rounded-2xl flex justify-center items-center'
                        onPress={() => router.push({
                            pathname: './chats',
                            params: {email}
                        })} 
                    >
                        <Text className='text-white font-semibold text-sm'>Let's Go</Text>
                    </TouchableOpacity>
                </View>
            </View>}

            {noProfile && <View className="w-screen h-screen flex justify-center items-center z[999]">
                <Text className="text-3xl font-semibold">No profiles available</Text>
                <TouchableOpacity className="w-28 h-10 flex justify-center items-center bg-black rounded-2xl mt-10" onPress={bringBackDislikedProfiles}>
                    <Text className="text-white text-xs font-semibold">Review Profiles</Text>
                </TouchableOpacity>
            </View>}

            {!inTrial && 
                <View className="w-screen h-screen flex justify-center items-center z[1000]">
                    <Text className="text-3xl font-semibold">Your Trial is Over</Text>
                </View>
            }

            {profile && inTrial && (
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', backgroundColor: 'white' }}>
                    <View className="w-full h-96">
                        <Image source={{ uri: profile.images.profilePic }} className="w-full h-full" resizeMode="cover" />
                        <View className="w-full h-24 flex flex-row justify-center items-center absolute bottom-0 left-0">
                            <TouchableOpacity className="w-20 h-20 flex justify-center items-center border border-white bg-white rounded-full overflow-hidden" onPress={() => swipeForDislike(email, profile.email)}>
                                <Image source={require('../../assets/Images/cross.png')} className="w-7 h-7" />
                            </TouchableOpacity>

                            <TouchableOpacity className="w-24 h-24 flex justify-center items-center border border-white bg-white rounded-full mx-6 overflow-hidden" onPress={() => swipeForLike(email, profile.email)} >
                                <Image source={require('../../assets/Images/icon.png')} className="w-28 h-28" />
                            </TouchableOpacity>

                            <TouchableOpacity className="w-20 h-20 flex justify-center items-center border border-white bg-white rounded-full overflow-hidden" onPress={() => swipeForLike(email, profile.email)} >
                                <Image source={require('../../assets/Images/star.png')} className="w-8 h-8" />
                            </TouchableOpacity>
                        </View>
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
            )}
        </SafeAreaView>
    );
}

export default Home;