import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Touchable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {useLocalSearchParams, router} from 'expo-router';
import axios from 'axios';

import BottomNavigator from "@/components/BottomNavigator";

import RazorpayCheckout from 'react-native-razorpay';

const SubscriptionCard = ({Title, Price, Description, onPressButton}) => (
    <View className='w-[300px] h-[300px] bg-black flex flex-col justify-between items-center rounded-md mb-10'>
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

const Payment = () => {

    const { email } = useLocalSearchParams();

    const [subscriptionType, setSubscriptionType] = useState('');

    useEffect(() => { fetchMyProfile() }, [])

    const fetchMyProfile = async() => {
        try{
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/get-profiles/get-my-profile`, {email: email});

            if(response.data.success){
                setSubscriptionType(response.data.subscriptionPlan);
            }

        }catch(error:any){
            if (error.response) {
                console.error("Error:", error.response.data.message);
            } else {
                console.error("Error:", error.message);
            }
        }
        
    }
    
    const buyBasicSubscription = async() => {
        try{
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/payments/buy-basic-subscription`, {email: email});
    
            console.log(response.data.subscription.id);
    
            if(response.data.success){
                const options = {
                    key: 'rzp_test_df9pYQrTw8Pj58',
                    subscription_id: response.data.subscription,
                    name: "UniHearts",
                    description: "UniHearts Basic Plan",
                    prefill: {
                        name: response.data.customerName,
                        email: response.data.customerEmail,
                        contact: "9999999999"
                    }
                }
    
                const razorpayPayment =  RazorpayCheckout.open(options).then(async(data) => {
                    console.log(".then", data)
                    const paymentVerificationResponse = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/payments/verify-payment`, {
                        email: email,
                        plan: "Basic",
                        paymentId: data.razorpay_payment_id,
                        subscriptionId: data.razorpay_subscription_id,
                        signature: data.razorpay_signature,
                    });
                
                    if (paymentVerificationResponse.data.success) {
                        console.log("Payment successful!");
                    } else {
                        console.log("Payment verification failed");
                    }
    
    
                }).catch((error) => {
                    console.log("here .catch", error)
                })
                
            }else{
                console.log("Error while loading Razorpay in Frontend");
            }
        } catch(error){
            if(error.response) {
                console.error("Error:", error.response.data.message);
                return error.response.data;
            }else{
                console.error("Error:", error.message);
                return { success: false, message: "An unknown error occurred in Payment" };
            }
        }
    }

    const buyPremiumSubscription = async() => {
        try{
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/payments/buy-premium-subscription`, {email: email});
    
            console.log(response.data.subscription.id);
    
            if(response.data.success){
                const options = {
                    key: 'rzp_test_df9pYQrTw8Pj58',
                    subscription_id: response.data.subscription,
                    name: "UniHearts",
                    description: "UniHearts Premium Plan",
                    prefill: {
                        name: response.data.customerName,
                        email: response.data.customerEmail,
                        contact: "9999999999"
                    }
                }
    
                const razorpayPayment =  RazorpayCheckout.open(options).then(async(data) => {
                    console.log(".then", data)
                    const paymentVerificationResponse = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/payments/verify-payment`, {
                        email: email,
                        plan: "Premium",
                        paymentId: data.razorpay_payment_id,
                        subscriptionId: data.razorpay_subscription_id,
                        signature: data.razorpay_signature,
                    });
                
                    if (paymentVerificationResponse.data.success) {
                        console.log("Payment successful!");
                    } else {
                        console.log("Payment verification failed");
                    }
    
    
                }).catch((error) => {
                    console.log("here .catch", error)
                })
                
            }else{
                console.log("Error while loading Razorpay in Frontend");
            }
        } catch(error){
            if(error.response) {
                console.error("Error:", error.response.data.message);
                return error.response.data;
            }else{
                console.error("Error:", error.message);
                return { success: false, message: "An unknown error occurred in Payment" };
            }
        }
    }
    
    return(
        <SafeAreaView className="flex-1 w-full h-full bg-white justify-start items-center flex flex-col">
            <StatusBar style="dark" />
            <BottomNavigator value={email}/>

            <Text className="w-4/5 flex flex-row justify-start items-center text-3xl font-bold text-black text-center">Choose your plan</Text>

            {/* <View className="w-full flex justify-evenly items-center 
            "> */}
                {subscriptionType === "Basic" && 
                    <View className='w-full h-full flex flex-col justify-center items-center'>
                        <SubscriptionCard 
                            Title={"Premium Plan"}
                            Price={"₹99"}
                            Description={"All Basic\nComment on swipes\nKnow who liked you"}
                            onPressButton={buyPremiumSubscription}
                        />
                    </View>
                }

                {subscriptionType === "Premium" && 
                    <View className='w-screen h-screen flex flex-col justify-center items-center'>
                        <Text className='text-2xl font-bold text-black'>You are already subscribed to premium plan</Text>
                    </View>
                }
                    
                {subscriptionType === "Free" && 
                    <View className='w-full h-full flex flex-col justify-evenly items-center'>
                        <SubscriptionCard 
                            Title={"Basic Plan"} 
                            Price={"₹49"} 
                            Description={
                                "Unlimited Swipes\nUnlimited Matches\nChat on match\n24/7 Support"
                            }
                            onPressButton={buyBasicSubscription}
                        />
                        <SubscriptionCard 
                            Title={"Premium Plan"}
                            Price={"₹99"}
                            Description={"All Basic\nComment on swipes\nKnow who liked you"}
                            onPressButton={buyPremiumSubscription}
                        />
                    </View>
                }
            {/* </View> */}

        </SafeAreaView>
    )
}

export default Payment;