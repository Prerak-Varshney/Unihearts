import { View, Image } from 'react-native';

const Loading = () => {
    return(
        <View className='w-screen h-screen bg-white flex justify-center items-center absolute top-0 left-0 z-50'>
            <Image source={require('../assets/Images/Unihearts_Logo.jpeg')} className='w-40 h-40'/>
        </View>
    )
}

export default Loading;