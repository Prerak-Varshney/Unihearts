import { View, Text, TouchableOpacity, Image } from 'react-native'
import { router } from 'expo-router'
const SubscriptionRedirectComponent = ({email, subscriptionType}) => {
    return(
        <View className='w-screen h-screen flex flex-col justify-evenly items-center p-2 bg-white rounded-lg'>
            <Text className='text-black text-xl text-center font-bold'>{subscriptionType}</Text>

            <Image source={require('../assets/Images/flowers.png')} className="w-80 h-80 my-4"/>

            <TouchableOpacity
                className='w-full flex justify-center items-center p-2 bg-black rounded-lg'
                onPress={() => {router.push({
                    pathname: './payment',
                    params: { email }
                })}}
            >
                <Text className='text-white text-center text-base'>Subscribe Now</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SubscriptionRedirectComponent;