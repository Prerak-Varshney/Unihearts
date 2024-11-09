import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

import Input from '@/components/Input';
import {signup, verifyEmail, resendOtp} from '@/api/auth';

const signUp = () => {
    const [value, setValue] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const [OTPValue, setOTPValue] = useState("");
    const [isResendOtpVisible, setIsResendOtpVisible] = useState(true);
    const [isDefaultTimerVisible, setIsDefaultTimerVisible] = useState(true);

    const otpRef = useRef(null);

    useEffect(() => {
        if (showOTP && otpRef.current) {
            otpRef.current?.focus();
        }
    }, [showOTP]);


    const signUpOnPress = async() => {
        //Sign up
        Keyboard.dismiss();

        if(!showOTP){
            const response = await signup(value);

            if(response.success){
                setShowOTP(true);
            }
            
            console.log(response);

        }else{
            //Verify

            const response = await verifyEmail(value, OTPValue);

            if(response.success){
                setShowOTP(false);
                router.replace({
                    pathname: '../(profile)/gender',
                    params: { email: value },
                });
            }

            console.log(response)
        }
    }

    const resendOTP = () => {
        setIsResendOtpVisible(false);
        setIsDefaultTimerVisible(false);
        resendOtp(value, "signup");
    }
      
     
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <SafeAreaView className="flex-1 w-full h-full bg-white justify-center items-center flex flex-col">
                    <StatusBar style="dark" />
                    
                    <View className='w-4/5 flex justify-center items-center mb-10'>
                        <Text className='text-black text-sm font-semibold text-center'>Please enter your valid student Mail-id, as this app is exclusive for Bennetians.</Text>
                    </View>

                    <Input 
                        otherClassName={`${showOTP ? 'border-gray-400 text-gray-400' : 'border-black text-black'}`}
                        placeHolder={"eroll@bennett.edu.in"} 
                        value={value} 
                        setValue={setValue}
                        keyboardType="email-address"
                        isEditable={!showOTP}
                    />

                    {showOTP && <Input 
                        otherClassName={'mt-5'} 
                        placeHolder={"OTP"} 
                        value={OTPValue} 
                        setValue={setOTPValue} 
                        ref={otpRef}
                        keyboardType="number-pad"/>
                    }
                    
                    {showOTP && <View className={`w-4/5 h-10 mt-1 flex flex-row ${!isDefaultTimerVisible ? 'justify-end' : 'justify-between'} items-center`}>

                        {isDefaultTimerVisible && <View className='flex justify-center items-center'>
                            <CountdownCircleTimer
                                duration={120}
                                colors={['#000000', '#ff852b', '#FF0000', '#b11f00']}
                                colorsTime={[120, 60, 30, 0]}
                                size={40}
                                strokeWidth={3}
                                onComplete={() => {setIsResendOtpVisible(true)}}
                                isPlaying={showOTP}
                            >
                                {({ remainingTime }) => <Text>{remainingTime}</Text>}
                            </CountdownCircleTimer>
                        </View>}

                        {isResendOtpVisible ? 
                        <TouchableOpacity className='flex justify-center items-center' onPress={() => {resendOTP()}}>
                            <Text className='text-black w-full font-semibold'>Resend OTP</Text>
                        </TouchableOpacity> 
                        : 
                        <View className='flex justify-center items-center'>
                             <CountdownCircleTimer
                                isPlaying
                                duration={120}
                                colors={['#000000', '#ff852b', '#FF0000', '#b11f00']}
                                colorsTime={[120, 60, 30, 0]}
                                size={40}
                                strokeWidth={3}
                                onComplete={() => {setIsResendOtpVisible(true);}}
                            >
                                {({ remainingTime }) => <Text>{remainingTime}</Text>}
                            </CountdownCircleTimer>
                        </View>
                        }

                    </View>}
                    
                    <TouchableOpacity className='bg-black w-4/5 h-12 rounded-2xl flex justify-center items-center mb-6 mt-10' onPress={() => {signUpOnPress()}}>
                        <Text className='text-white font-semibold text-lg'>{showOTP ? "Verify" : "Sign Up"}</Text>
                    </TouchableOpacity>

                    <View className='w-4/5 flex justify-center items-center'>
                        <Link href="/signin">
                            <Text>Already have an account? </Text>
                            <Text className='font-bold'>Sign in</Text>
                        </Link>
                    </View>
                    
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
  );
}


export default signUp;