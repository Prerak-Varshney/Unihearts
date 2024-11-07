import {View, TextInput} from 'react-native'

import { forwardRef } from 'react';

const Input = forwardRef(({placeHolder, value, setValue, otherClassName, isEditable = true, keyboardType = 'default', ...props}, ref) => {
    return(
        <View className={`w-4/5 flex flex-row justify-start items-center relative bg-white`}>
            <TextInput 
                className={`border border-black rounded-2xl h-12 text-left pl-5 font-semibold flex-1 text-black ${otherClassName}`} 
                placeholder={placeHolder} 
                placeholderTextColor={"grey"} 
                value={value} 
                onChangeText={setValue}
                keyboardType={keyboardType}  
                editable={isEditable}
                ref={ref}/>
        </View>
    )
})

export default Input;