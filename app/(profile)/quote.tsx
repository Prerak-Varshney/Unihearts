// import { SafeAreaView } from "react-native-safe-area-context";
// import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import Offers from "@/components/Offers";
const Quote = () => {
    const { email } = useLocalSearchParams(); 

    const addMoreDetails = () => {
        router.replace({
            pathname: './course',
            params: { email },
        });
    }
    return(
        <Offers 
            description={"The more you share, the better your matches"}
            buttonText={"Add more details"}
            buttonOnPress={addMoreDetails}
        />
    )
}

export default Quote;