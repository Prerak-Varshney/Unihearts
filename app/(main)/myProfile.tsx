import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from 'expo-router';
import { DetailsScrollViewComponent, AfterScrollBarDetailsComponent, ImageComponent } from '@/components/HomeComponents';
import Loading from '@/components/Loading';
import BottomNavigator from "@/components/BottomNavigator";
import axios from 'axios'
import Feather from '@expo/vector-icons/Feather';
import * as SecureStore from 'expo-secure-store';

const MyProfile = () => {

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
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [isMenu, setIsMenu] = useState<Boolean>(false);
    const [isConfirmDelete, setIsConfirmDelete] = useState<Boolean>(false);

    useEffect(() => {
        fetchMyProfile();
    }, []);

    const fetchMyProfile = async() => {
        setIsLoading(true);
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
        }finally{
            setIsLoading(false);
        }
        
    }

    const signOut = async() => {
        setIsLoading(true);
        try{
            await SecureStore.deleteItemAsync('email');
            console.log("Deleted email from secure store")
        }catch(error){
            console.log("Error deleting email from secure store", error)
        }
          
        console.log("Signed out")
        router.replace('/(auth)/signin');

        setIsLoading(false);
        
    }

    const editProfile = () => {
        // return
        router.push({
            pathname: '/(edit)/editProfile',
            params: { email: email }
        })
    }

    const deleteAccount = async() => {
        try{
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/delete-account`, {email: email});
            if(response.data.success){
                
                try{
                    await SecureStore.deleteItemAsync('email');
                    console.log("Deleted email from secure store")
                }catch(error){
                    console.log("Error deleting email from secure store", error)
                }

                console.log("Account deleted")
                router.replace('/(auth)/signin');
            }else{
                console.log("Error deleting account")
            }
        }catch(error:any){
            if (error.response) {
                console.log("Error:", error.response.data.message);
            } else {
                console.log("Error:", error.message);
            }
        }
    }
    

    return (
        <SafeAreaView className="bg-white w-full h-full">
            <StatusBar style="dark"/>
            <BottomNavigator value={email}/>
            {isLoading && <Loading/>} 
            {isConfirmDelete && 
                <View className="bg-white w-full h-full flex justify-center items-center">
                    <Text className="text-red-500 text-base font-bold">Are you sure you want to delete your account?</Text>
                    <View className="w-4/5 flex flex-row justify-evenly items-center">
                        <TouchableOpacity className="w-28 h-10 bg-red-500 rounded-lg flex justify-center items-center mt-4" onPress={() => deleteAccount()}>
                            <Text className="text-white text-base font-bold">Delete</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="w-28 h-10 bg-black rounded-lg flex justify-center items-center mt-4" onPress={() => setIsConfirmDelete(false)}>
                            <Text className="text-white text-base font-bold">Return</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            {isMenu ?
                <View className="absolute bg-white w-28 h-40 rounded-lg top-8 right-0 z-50 flex justify-start items-center border border-gray-500">
                    <TouchableOpacity className="bg-white w-full h-10 rounded-lg flex justify-center items-end pr-2" onPress={() => setIsMenu(false)}>
                        <Feather name="settings" size={20} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-white w-full h-10 flex justify-center items-center border-y border-y-gray-300" onPress={() => editProfile()}>
                    <Text className="text-black text-sm">Edit Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-white w-full h-10 flex justify-center items-center border-b border-b-gray-300" onPress={() => signOut()}>
                        <Text className="text-black text-sm">Sign out</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-white w-full h-10 flex justify-center items-center border-b border-b-gray-500 rounded-lg" onPress={() => setIsConfirmDelete(true)}>
                        <Text className="text-red-500 text-sm">Delete Account</Text>
                    </TouchableOpacity>

                </View>
                :
                <TouchableOpacity className="absolute bg-white w-10 h-10 rounded-full top-8 right-0 z-50 flex justify-center items-center" onPress={() => setIsMenu(true)}>
                    <Feather name="settings" size={24} color="black" />
                </TouchableOpacity>
            }
            {profile ? (
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', backgroundColor: 'white' }}>
                    
                    <View className="w-full h-96 relative">
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
                <View className="w-full h-full flex justify-center items-center">
                    <Text className="text-black font-bold text-xl">Profile not found</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

export default MyProfile;
