import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

import Input from '@/components/Input';
import {signin, verifySignin, resendOtp} from '@/api/auth';


const signIn = () => {
    const [value, setValue] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const [OTPValue, setOTPValue] = useState("");
    const [isResendOtpVisible, setIsResendOtpVisible] = useState(true);
    const [isDefaultTimerVisible, setIsDefaultTimerVisible] = useState(true);
    const [isErrorMessage, setIsErrorMessage] = useState(false);

    const otpRef = useRef(null);

    useEffect(() => {
        if (showOTP && otpRef.current) {
            otpRef.current?.focus();
        }
    }, [showOTP]);


    const signInOnPress = async() => {
        Keyboard.dismiss();
        
        if(!showOTP){
            const response = await signin(value);

            if(response.success){
                setShowOTP(true)
                setIsErrorMessage(false);
            }else{
                setIsErrorMessage(true);
            }
            
            console.log("showOTP false");
            console.log(response)

        }else{
            const response = await verifySignin(value, OTPValue);

            if(response.success){
                setShowOTP(false)
                
                if(response.isProfileComplete){
                    console.log(response);
                    router.replace({
                        pathname: '../(main)/home',
                        params: { email: value },
                    });
                    return
                }else{
                    console.log(response);
                    router.replace({
                        pathname: '../(profile)/gender',
                        params: { email: value },
                    });
                    return
                }
            }

            return
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
                            <Text className='text-black text-sm font-semibold text-center'>Please enter your registered student email, to complete your sign in.</Text>
                            <Text className='text-gray-500 text-sm font-semibold text-center mt-2'>*This won't be displayed anywhere</Text>
                            {isErrorMessage && <Text className='text-red-500 text-sm font-semibold text-center mt-2'>User does not exists or invalid email</Text>}
                        </View>

                        <Input 
                            otherClassName={`${showOTP ? 'border-gray-400 text-gray-400' : 'border-black text-black'}`}
                            placeHolder={"name@college.com"} 
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

                    </View>

                    }
                    {showOTP && <Text className='text-red-500 text-xs font-semibold mt-2'>*Please check your Junk Folder</Text>}
                    
                        
                        <TouchableOpacity className='bg-black w-4/5 h-12 rounded-2xl flex justify-center items-center mb-6 mt-10' onPress={() => {signInOnPress()}}>
                            <Text className='text-white font-semibold text-lg'>{showOTP ? "Verify" : "Sign In"}</Text>
                        </TouchableOpacity>

                        <View className='w-4/5 flex justify-center items-center'>
                            <Link href="/signup">
                                <Text >Don't have an account? </Text>
                                <Text className='font-bold'>Sign up</Text>
                            </Link>
                        </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}


export default signIn;
