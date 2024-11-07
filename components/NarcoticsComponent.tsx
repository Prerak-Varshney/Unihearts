import { Text, View, Pressable } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface Props {
    isSubstanceVisible: boolean
    handleScreenVisibility: () => void
    substance: string
    isSubstance: boolean
    setIsSubstance: (value: boolean) => void
}

const narcoticsComponent: React.FC<Props> = ({ isSubstanceVisible, handleScreenVisibility, substance, isSubstance, setIsSubstance }) => {
    return (
        <View className="w-4/5 h-24 flex flex-row justify-between items-center">
            <View className="w-1/2 h-full flex flex-col justify-evenly items-center">
                <View className="w-full flex flex-row justify-center items-center">
                    <Text className="w-full text-2xl font-semibold text-black text-center">{substance}</Text>
                </View>

                <View className="w-full flex flex-row justify-center">

                    <BouncyCheckbox
                        size={20}
                        innerIconStyle={{borderRadius: 5}}
                        iconStyle={{borderRadius: 5}}
                        style={{borderRadius: 5}}
                        disableText={true}
                        fillColor="#000000"
                        onPress={handleScreenVisibility}
                        isChecked={isSubstanceVisible}
                    />

                    <Text className="flex flex-row justify-start items-center text-sm font-semibold text-black text-left"> Visibile on profile?</Text>
                </View>                    
            </View>

            <View className="w-1/2 h-full flex flex-col justify-around items-center">
                <View className="w-full h-1/2 flex flex-row justify-center items-center">
                    <BouncyCheckbox
                        size={32}
                        innerIconStyle={{borderRadius: 5}}
                        iconStyle={{borderRadius: 5}}
                        style={{borderRadius: 5}}
                        disableText={true}
                        fillColor="#000000"
                        onPress={() => {setIsSubstance(true)}}
                        isChecked={isSubstance}
                    />

                    
                    <Text className="text-sm font-semibold text-black ml-3">Yes</Text>
                </View>    

                <View className="w-full h-1/2 flex flex-row justify-center items-center">

                    <BouncyCheckbox
                        size={32}
                        innerIconStyle={{borderRadius: 5}}
                        iconStyle={{borderRadius: 5}}
                        style={{borderRadius: 5}}
                        disableText={true}
                        fillColor="#000000"
                        onPress={() => {setIsSubstance(false)}}
                        isChecked={!isSubstance}
                    />

                    <Text className="text-sm font-semibold text-black ml-3">No</Text>
                </View>                    
            </View>
        </View>
    )
}

export default narcoticsComponent