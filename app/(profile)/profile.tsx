import { useState, useEffect } from "react";

import { View, Text, TouchableOpacity, Image, Platform, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

import { useLocalSearchParams, router } from "expo-router";

import Input from "@/components/Input";
import { postProfileDetails } from "@/api/userDetails";
import Loading from '../../components/Loading';


import * as ImagePicker from 'expo-image-picker';

import axios from 'axios'; 
import mime from 'mime';


const Profile = () => {

    const { email } = useLocalSearchParams(); 

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState(null);
    const [isBirthDaySelect, setIsBirthDaySelect] = useState(false);
    const [shouldBirthdayBeVisible, setShouldBirthdayBeVisible] = useState<Boolean>(false);

    const [selectProfileImage, setSelectProfileImage] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState<Boolean>(false);

    useEffect(() => {
        
    }, [selectProfileImage])

    const pickProfileImage = async() => {
        Keyboard.dismiss();
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(status !== 'granted'){
            return alert("Sorry, we need camera roll permissions to make this work!");
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [1, 1],
            quality: 0.5
        });

        if(!result.canceled && result.assets[0].uri){
            setSelectProfileImage(result.assets[0].uri);
        }

    }

    const onBirthDaySelect = () => {
        Keyboard.dismiss();
        setIsBirthDaySelect(!isBirthDaySelect);
        if(birthday){
            setShouldBirthdayBeVisible(true);
        }else{
            setShouldBirthdayBeVisible(false);
        }
        
    }

    const profileConfirm = async() => { 
        Keyboard.dismiss();
        setIsLoading(true);

        setSelectProfileImage("file:///" + selectProfileImage.split("file:/").join(""))
        const formdata = new FormData();
        formdata.append('profileImage', {
            uri: selectProfileImage,
            type: mime.getType(selectProfileImage),
            name: selectProfileImage?.split("/").pop()
        })
        formdata.append('email', email);
                
        const response = await postProfileDetails(email, firstName, lastName, birthday);
        
        try{
            const postImageData = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/images/upload-profile-image`, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            })
            console.log("successfully sent profile image")
            
        }catch(error:any){
            if(error.postImageData) {
                setIsLoading(false);
                console.log("Error while uploading profile Image:", error.postImageData.data.message);
                return error.postImageData.data;
            }else{
                setIsLoading(false);
                console.log("Error:", error.message);
                return { success: false, message: "An unknown error occurred in profile image" };
            }
        }

        if(!response.success){
            setIsLoading(false);
            return response.message;
        }

        router.replace({
            pathname: './quote',
            params: { email },
        });
        console.log(response);
        setIsLoading(false);
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <SafeAreaView className="flex-1 w-full h-full bg-white justify-evenly items-center flex flex-col">

                    <Text className="w-4/5 flex flex-row justify-start items-center text-3xl font-bold text-black">Profile Details</Text>

                    <View className="w-full justify-center items-center flex flex-col">
                        <Text className="font-semibold text-sm w-4/5 flex flex-row justify-start items-center">Add your profile picture to get started</Text>

                        <TouchableOpacity className="border border-black border-dashed rounded-3xl w-1/2 h-40 my-6 " onPress={pickProfileImage}>
                        
                            <Image source={{uri: selectProfileImage || ''}} className="w-full h-full rounded-3xl"/>
                        </TouchableOpacity>
                    </View>
                    
                    <View className="w-full justify-center items-center flex flex-col">
                        <Input otherClassName={''} placeHolder={"First Name"} value={firstName} setValue={setFirstName}/>

                        <Input otherClassName={'my-4'} placeHolder={"Last Name"} value={lastName} setValue={setLastName}/>

                        <TouchableOpacity 
                            className='bg-gray-200 w-4/5 h-12 rounded-2xl flex justify-center items-center mb-6' 
                            style={{
                                backgroundColor: shouldBirthdayBeVisible ? 'white' : '#d9d9d9',
                                borderWidth: shouldBirthdayBeVisible ? 1 : 0,
                                borderColor: shouldBirthdayBeVisible ? 'black' : undefined,
                            }} 
                            onPress={() => {onBirthDaySelect()}}
                        >
                            <Text className='text-black font-semibold text-sm'>{shouldBirthdayBeVisible ? dayjs(birthday).format('DD - MM - YYYY') : 'Choose birthday date'}</Text>
                        </TouchableOpacity>

                    </View>

                    <View className="w-full justify-end items-center flex flex-col">
                        <TouchableOpacity className='bg-black w-4/5 h-12 rounded-2xl flex justify-center items-center' onPress={profileConfirm}>
                            <Text className='text-white font-semibold text-sm'>Confirm</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        isBirthDaySelect && (
                        <>
                            <View className="absolute w-full h-full inset-0 bg-black opacity-50 z-10" />
                            <View className="z-20 w-full h-1/2 absolute bg-white flex justify-center items-center bottom-0 left-0 shadow-2xl rounded-t-3xl">
                            <DateTimePicker
                                mode="single"
                                date={birthday}
                                onChange={(params) => {
                                    setBirthday(params.date);
                                    setIsBirthDaySelect(!isBirthDaySelect);
                                    setShouldBirthdayBeVisible(true);
                                }}
                                selectedItemColor={'black'}
                            />
                            </View>
                        </>
                        )
                    }

                    {isLoading && <Loading/>}
                    
                </SafeAreaView> 
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default Profile;