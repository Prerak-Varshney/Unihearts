import {View, Text, TouchableOpacity, Touchable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

// import RazorpayCheckout from 'react-native-razorpay';


const SubscriptionCard = ({Title, Price, Description, onPressButton}) => (
    <View className='w-[300px] h-[300px] bg-black flex flex-col justify-between items-center rounded-md'>
        <View className='w-full h-12 flex justify-center items-center border-b border-b-white'>
            <Text className='text-xl font-bold text-white'>{Title}</Text>
        </View>

        <View className='w-full h-[200px] flex justify-center items-center'>
            <Text className='text-lg text-white text-center'>{Description}</Text>
        </View>

        <TouchableOpacity className='bg-white border border-black w-full h-12 flex justify-center items-center rounded-b-md'
        onPress={onPressButton}>
            <Text className='text-xl font-bold text-black'>{Price}</Text>
        </TouchableOpacity>
    </View>
)

const buyBasicSubscription = async() => {
    // try{
    //     const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/payments/buy-basic-subscription`, {email: "e22cseu0138@bennett.edu.in"});

    //     console.log(response.data.subscription.id);

    //     if(response.data.success){
    //         const options = {
    //             key: 'rzp_test_df9pYQrTw8Pj58',
    //             subscription_id: response.data.subscription,
    //             name: "UniHearts",
    //             description: "UniHearts Basic Plan",
    //             prefill: {
    //                 name: response.data.customerName,
    //                 email: response.data.customerEmail,
    //                 contact: "9999999999"
    //             }
    //         }

    //         const razorpayPayment =  RazorpayCheckout.open(options).then((data) => {
    //             console.log(".then", data)
    //         }).catch((error) => {
    //             console.log(".catch", error)
    //         })
            
    //         // razorpayPayment.open();
    //     }else{
    //         console.log("Error while loading Razorpay in Frontend");
    //     }
    // } catch(error){
    //     if(error.response) {
    //         console.error("Error:", error.response.data.message);
    //         return error.response.data;
    //     }else{
    //         console.error("Error:", error.message);
    //         return { success: false, message: "An unknown error occurred in Payment" };
    //     }
    // }
}


const Payment = () => {

    return(
        <SafeAreaView className="flex-1 w-full h-full bg-white justify-between items-center flex flex-col">
            <StatusBar style="dark" />
            <Text className="w-4/5 flex flex-row justify-start items-center text-3xl font-bold text-black text-center">Choose your plan</Text>

            <View className="w-full flex justify-evenly items-center 
            ">
                <SubscriptionCard 
                    Title={"Basic Plan"} 
                    Price={"49"} 
                    Description={
                        "Unlimited Swipes\nUnlimited Matches\nChat on match\n24/7 Support"
                    }
                    onPressButton={buyBasicSubscription}
                />
                <SubscriptionCard 
                    Title={"Premium Plan"}
                    Price={"99"}
                    Description={"All Basic\nComment on swipes\nKnow who liked you"}
                />
            </View>

        </SafeAreaView>
    )
}

export default Payment;