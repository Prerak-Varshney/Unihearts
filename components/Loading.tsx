import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const Loading = () => {
    return(
        <SafeAreaView className='w-screen h-screen bg-white flex justify-center items-center z-[999999]'>
            <Image source={require('../assets/Images/Unihearts_Logo.jpeg')} className='w-40 h-40'/>
        </SafeAreaView>
    )
}

export default Loading;