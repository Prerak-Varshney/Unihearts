import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import mime from 'mime';

import Loading from '../../components/Loading';

const SelectImage = () => {
    const { email } = useLocalSearchParams();

    const [image1, setImage1] = useState<string | null>(null);
    const [image2, setImage2] = useState<string | null>(null);
    const [image3, setImage3] = useState<string | null>(null);
    const [image4, setImage4] = useState<string | null>(null);
    const [image5, setImage5] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        fetchMyProfile();
    }, []);

    const fetchMyProfile = async() => {
        try{
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/get-profiles/get-my-profile`, {email: email});

            const data = response.data.user;
            setProfile(data);
            setImage1(data.images.image1);
            setImage2(data.images.image2);
            setImage3(data.images.image3);
            setImage4(data.images.image4);
            setImage5(data.images.image5);

        }catch(error:any){
            if (error.response) {
                console.log("Error:", error.response.data.message);
            } else {
                console.log("Error:", error.message);
            }
        }
    }

    const pickImage = async (setImage) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [1, 1],
            quality: 0.5,
        });

        if(!result.canceled && result.assets[0].uri) {
            setImage(result.assets[0].uri);
            
        }
    };

    const imageConfirm = async () => {
        setIsLoading(true);
        if(!image1 || !image2 || !image3 || !image4 || !image5) {
            setIsLoading(false);
            console.log("Please select all images");
            return;
        }

        setImage1("file:///" + image1.split("file:/").join(""))
        setImage2("file:///" + image2.split("file:/").join(""))
        setImage3("file:///" + image3.split("file:/").join(""))
        setImage4("file:///" + image4.split("file:/").join(""))
        setImage5("file:///" + image5.split("file:/").join(""))

        console.log(image1, image2, image3, image4, image5);

        const formData = new FormData(); 
        formData.append('email', email); 

        formData.append('image1', {
            uri: image1,
            type: mime.getType(image1), 
            name: image1?.split('/').pop(),
        });
        formData.append('image2', {
            uri: image2,
            type: mime.getType(image2), 
            name: image2?.split('/').pop(),
        });
        formData.append('image3', {
            uri: image3,
            type: mime.getType(image3), 
            name: image3?.split('/').pop(),
        });
        formData.append('image4', {
            uri: image4,
            type: mime.getType(image4), 
            name: image4?.split('/').pop(),
        });
        formData.append('image5', {
            uri: image5,
            type: mime.getType(image5), 
            name: image5?.split('/').pop(),
        });

        try {
            const postImageData = await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/images/upload-images`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json'
                    },
                }
            );

            router.replace({
                pathname: "./editProfile",
                params: { email },
            });
            
            setIsLoading(false);

        } catch (error:any) {
            if(error.postImageData) {
                setIsLoading(false);
                console.log("Error while uploading images:", error.postImageData.data.message);
                return error.postImageData.data;
            }else{
                setIsLoading(false);
                console.log("Error:", error);
                return { success: false, message: "An unknown error occurred" };
            }
        }
    };

    return (
        <SafeAreaView className="flex-1 w-full h-full bg-white justify-evenly items-center flex flex-col">
            {isLoading ? <Loading /> : 
            <View className='flex-1 w-full h-full bg-white justify-evenly items-center flex flex-col'>
                <Text className="w-4/5 flex flex-row justify-start items-center text-3xl font-bold text-black">
                    Boost your profile with eye-catching images!
                </Text>

                <View className='w-4/5 flex flex-row justify-between items-center'>
                    <TouchableOpacity
                        className={`w-[140px] h-[140px] flex justify-center items-center border border-black rounded-3xl border-dashed`}
                        onPress={() => pickImage(setImage1)}
                    >
                        {image1 ? (
                            <Image source={{ uri: image1 }} className="w-full h-full rounded-3xl" />
                        ) : (
                            <Text className="text-center">Pick Image 1</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`w-[140px] h-[140px] flex justify-center items-center border border-black rounded-3xl border-dashed`}
                        onPress={() => pickImage(setImage2)}
                    >
                        {image2 ? (
                            <Image source={{ uri: image2 }} className="w-full h-full rounded-3xl" />
                        ) : (
                            <Text className="text-center">Pick Image 2</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View className='w-4/5 flex flex-row justify-between items-center'>
                    <TouchableOpacity
                        className={`w-[140px] h-[140px] flex justify-center items-center border border-black rounded-3xl border-dashed`}
                        onPress={() => pickImage(setImage3)} 
                    >
                        {image3 ? (
                            <Image source={{ uri: image3 }} className="w-full h-full rounded-3xl" />
                        ) : (
                            <Text className="text-center">Pick Image 3</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`w-[140px] h-[140px] flex justify-center items-center border border-black rounded-3xl border-dashed`}
                        onPress={() => pickImage(setImage4)}
                    >
                        {image4 ? (
                            <Image source={{ uri: image4 }} className="w-full h-full rounded-3xl" />
                        ) : (
                            <Text className="text-center">Pick Image 4</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View className='w-4/5 flex flex-row justify-between items-center'>
                    <TouchableOpacity
                        className={`w-[140px] h-[140px] flex justify-center items-center border border-black rounded-3xl border-dashed`}
                        onPress={() => pickImage(setImage5)} 
                    >
                        {image5 ? (
                            <Image source={{ uri: image5 }} className="w-full h-full rounded-3xl" />
                        ) : (
                            <Text className="text-center">Pick Image 5</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View className="w-full justify-end items-center flex flex-col">
                    <TouchableOpacity
                        className='bg-black w-4/5 h-12 rounded-2xl flex justify-center items-center'
                        onPress={imageConfirm} 
                    >
                        <Text className='text-white font-semibold text-sm'>Edit Images</Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
        </SafeAreaView>
    );
};

export default SelectImage;
