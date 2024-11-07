import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import WheelPicker from '@quidone/react-native-wheel-picker';

import { postHeightDetails } from "@/api/userDetails";

const Height = () => {
    const { email } = useLocalSearchParams(); 
    const [height, setHeight] = useState(5.7);

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
        console.log(height);
        const response = await postHeightDetails(email, height);
        router.replace({
            pathname: './narcotics',
            params: { email },
        });
        console.log(response);
    }

    return (
        <SafeAreaView className="flex-1 w-full h-full bg-white justify-evenly items-center flex flex-col">
            <View className="w-4/5 flex flex-col gap-2">
                <Text className="flex flex-row justify-start items-center text-3xl font-bold text-black text-center">How tall are you?</Text>
                <Text className="flex flex-row justify-start items-center text-lg font-semibold text-gray-400 text-center">Always visible on profile</Text>
            </View>

            <View className="w-4/5 flex flex-col gap-2">
                <Text className="flex flex-row justify-start items-center text-2xl font-semibold text-black text-center">(Feets)</Text>

                <WheelPicker
                    data={heights}
                    onValueChanged={({item: {value}}) => setHeight(parseFloat(value))}
                    value={"5.7"}
                />
            </View>

            <View className="w-full justify-end items-center flex flex-col">
                <TouchableOpacity className='bg-black w-4/5 h-12 rounded-2xl flex justify-center items-center' onPress={() => {heightConfirm()}}>
                    <Text className='text-white font-semibold text-sm'>Confirm</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

export default Height;

