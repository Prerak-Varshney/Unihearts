import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";

import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import NarcoticsComponent from "@/components/NarcoticsComponent";

import { postNarcoticsDetails } from "@/api/userDetails";

const narcotics = () => {
    const { email } = useLocalSearchParams();

    const [isSmokeVisible, setIsSmokeVisible] = useState<boolean>(true)
    const [isDrinkVisible, setIsDrinkVisible] = useState<boolean>(true)
    const [isWeedVisible, setIsWeedVisible] = useState<boolean>(true)

    const [isSmoke, setIsSmoke] = useState<boolean>(false)
    const [isDrink, setIsDrink] = useState<boolean>(false)
    const [isWeed, setIsWeed] = useState<boolean>(false)

    const handleSmokeVisible = () => {
        setIsSmokeVisible(prev => {
            return !prev
        })
    }
    const handleDrinkVisible = () => {
        setIsDrinkVisible(prev => {
            return !prev
        })
    }
    const handleWeedVisible = () => {
        setIsWeedVisible(prev => {
            return !prev
        })
    }

    const narcoticsConfirm = async() => {
        console.log(email, isSmokeVisible, isDrinkVisible, isWeedVisible, isSmoke, isDrink, isWeed);
        const response = await postNarcoticsDetails(email, isSmokeVisible, isDrinkVisible, isWeedVisible, isSmoke, isDrink, isWeed);
        router.replace({
            pathname: './selectImage',
            params: { email },
        })
        console.log(response);
    }

    return(
        <SafeAreaView className="flex-1 w-full h-full bg-white justify-evenly items-center flex flex-col">
            
            <Text className="w-4/5 flex flex-row justify-start items-center text-3xl font-bold text-black text-center">Do you?</Text>

            {/* Smoke */}
            <NarcoticsComponent 
                isSubstanceVisible={isSmokeVisible} 
                handleScreenVisibility={handleSmokeVisible} 
                substance="Smoke" 
                isSubstance={isSmoke} 
                setIsSubstance={setIsSmoke} 
            />

            {/* Drink */}
            <NarcoticsComponent 
                isSubstanceVisible={isDrinkVisible} 
                handleScreenVisibility={handleDrinkVisible} 
                substance="Drinks" 
                isSubstance={isDrink} 
                setIsSubstance={setIsDrink} 
            />

            {/* Weed */}
            <NarcoticsComponent 
                isSubstanceVisible={isWeedVisible} 
                handleScreenVisibility={handleWeedVisible} 
                substance="Weed" 
                isSubstance={isWeed} 
                setIsSubstance={setIsWeed} 
            />

            <View className="w-full justify-end items-center flex flex-col">
                <TouchableOpacity className='bg-black w-4/5 h-12 rounded-2xl flex justify-center items-center' onPress={() => {narcoticsConfirm()}}>
                    <Text className='text-white font-semibold text-sm'>Confirm</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}

export default narcotics;