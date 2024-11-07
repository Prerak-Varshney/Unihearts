import { View, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface BottomNavigatorProps {
    value: string;
}


const BottomNavigator = ({ value }: BottomNavigatorProps) => {

    const navigateToHome = (pathname: string) => {
        // if(path === 'home'){
        //     return
        // }
        // setPath('home');

        router.replace({
            pathname: `../(main)/${pathname}`,
            params: { email: value },
        })
    }
    const navigateToMatches = (pathname: string) => {
        // if(path === 'matches'){
        //     return
        // }
        // setPath('matches');

        router.replace({
            pathname: `../(main)/${pathname}`,
            params: { email: value },
        })
    }

    const navigateToChats = (pathname: string) => {
        // if(path === 'chats'){
        //     return
        // }
        // setPath('chats');

        router.replace({
            pathname: `../(main)/${pathname}`,
            params: { email: value },
        })
    }
    const navigateToMyProfile = (pathname: string) => {
        // if(path === 'myProfile'){
        //     return
        // }
        // setPath('myProfile');

        router.replace({
            pathname: `../(main)/${pathname}`,
            params: { email: value },
        })
    }

    return(
        <View className={`w-full bg-gray-100 flex flex-row justify-evenly absolute left-0 bottom-0 z-50 ${Platform.OS === 'ios' ? 'h-20 pt-2 items-start' : 'h-14 items-center'}`}>
            <TouchableOpacity className='flex-1 flex flex-row justify-center items-center' onPress={() => navigateToHome('home')}>
                <FontAwesome name="home" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity className='w-1/4 flex flex-row justify-center items-center' onPress={() => navigateToMatches('matches')}>
                <MaterialCommunityIcons name="account-heart" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity className='flex-1 flex flex-row justify-center items-center' onPress={() => navigateToChats('chats')}>
                <AntDesign name="wechat" size={24} color="black" />
            </TouchableOpacity>
            
            <TouchableOpacity className='flex-1 flex flex-row justify-center items-center' onPress={() => navigateToMyProfile('myProfile')}>
                <FontAwesome6 name="user-graduate" size={20} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default BottomNavigator;

 {/* {isChatsCountVisible && <View className='w-4 h-4 rounded-full bg-black flex justify-center items-center ml-1'>
                        <Text className='text-white text-xs'>{chatsCount}</Text>
                    </View>
                } */}