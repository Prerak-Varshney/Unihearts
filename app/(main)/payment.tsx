import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {useLocalSearchParams, router} from 'expo-router';
import axios from 'axios';

import BottomNavigator from "@/components/BottomNavigator";

import RazorpayCheckout from 'react-native-razorpay';

const SubscriptionCard = ({Title, Price, Description, onPressButton, otherClassNames}) => (
    <View className={`w-52 h-52 bg-black flex flex-col justify-between items-center rounded-md ${otherClassNames}`}>
        <View className='w-full h-10 flex justify-center items-center border-b border-b-white'>
            <Text className='text-base font-bold text-white'>{Title}</Text>
        </View>

        <View className='w-full h-32 flex justify-center items-center'>
            <Text className='text-base text-white text-center'>{Description}</Text>
        </View>

        <TouchableOpacity className='bg-white border border-black w-full h-10 flex justify-center items-center rounded-b-md'
        onPress={onPressButton}>
            <Text className='text-base font-bold text-black'>{Price}</Text>
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
                console.log("Error:", error.response.data.message);
            } else {
                console.log("Error:", error.message);
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
                console.log("Error:", error.response.data.message);
                return error.response.data;
            }else{
                console.log("Error:", error.message);
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
                console.log("Error:", error.response.data.message);
                return error.response.data;
            }else{
                console.log("Error:", error.message);
                return { success: false, message: "An unknown error occurred in Payment" };
            }
        }
    }
    
    return(
        <SafeAreaView className="flex-1 w-full h-full bg-white justify-center items-center flex flex-col">
            <StatusBar style="dark" />
            <BottomNavigator value={email}/>

            {/* <View className="w-full flex justify-evenly items-center 
            "> */}
                {subscriptionType === "Basic" && 
                    <View className='w-full h-full flex flex-col justify-center items-center'>
                        <SubscriptionCard 
                            Title={"Premium Plan"}
                            Price={"₹99"}
                            otherClassNames={"w-80 h-80"}
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
                    <View className='w-full h-auto flex flex-col justify-evenly items-center'>
                        <Text className="w-4/5 flex flex-row justify-start items-center text-3xl font-bold text-black text-center">Choose your plan</Text>

                        <Image source={require('../../assets/Images/flowers.png')} className="w-80 h-80 my-4"/>

                        <ScrollView horizontal contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', gap: 10}} showsHorizontalScrollIndicator={false} >

                            <SubscriptionCard 
                                Title={"Free Plan"} 
                                Price={"Free"}
                                Description={
                                    "Unlimited Swipes\n24/7 Support"
                                }
                                onPressButton={() => {
                                    router.push({
                                        pathname: '/home', 
                                        params: {email: email}
                                    })}
                                }
                            />

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
                        </ScrollView>
                    </View>
                }
            {/* </View> */}

        </SafeAreaView>
    )
}

export default Payment;