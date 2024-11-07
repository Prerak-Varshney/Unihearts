import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Platform } from "react-native";
const Offers = ({description, buttonText, buttonOnPress}) => {
    return(
        <SafeAreaView className="flex-1 w-full h-full bg-white justify-center items-center flex flex-col">
            <View className="w-4/5 flex justify-center items-center">
                <Text className='font-bold text-black text-5xl text-left leading-loose'>{description}</Text>
            </View>

            <TouchableOpacity className={`bg-black w-full h-16 flex items-center absolute bottom-0 ${Platform.OS === 'ios' ? 'h-16 justify-center' : 'h-12 justify-center'}`} onPress={buttonOnPress}>
                <Text className='text-white font-semibold text-lg'>{buttonText}</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default Offers;