import { View, Text } from 'react-native';
import Checkbox from 'expo-checkbox';

const ChoosePromptComponent = ({otherClassNames, isPromptSelected, setIsPromptSelected, prompt}) => {
    return(
        <View className='w-4/5 h-16 border-y border-y-gray-300 flex flex-row justify-start items-center'>
            <View className={`flex-1 h-full flex flex-row justify-start items-center ${otherClassNames}`}>
                <Text className='font-semibold text-lg text-black'>{prompt}</Text>
            </View>
            <Checkbox
                className='w-6 h-6 rounded-sm'
                value={isPromptSelected}
                onValueChange={setIsPromptSelected}
                color={isPromptSelected ? '#000000' : undefined}
            />
        </View>
    )
}

export default ChoosePromptComponent;