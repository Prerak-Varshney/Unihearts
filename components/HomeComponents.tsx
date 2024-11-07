import { View, Image, Text } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface DetailsScrollViewComponentProps {
    value: string;
    iconName: string;
    iconSource: string;
}

interface AfterScrollBarDetailsComponentProps {
    value: string;
    iconName: string;
    iconSource: string;
}

interface ImageComponentProps {
    uri: string;
}

export const DetailsScrollViewComponent = ({ value, iconName, iconSource }: DetailsScrollViewComponentProps) => {
  return (
        <View className={`h-8 border-r-gray-300 border-r flex flex-row ${value === '' ? "justify-center px-6" : "justify-evenly px-4"} items-center`}>

            <View className={`h-full justify-center items-center ${value === '' ? "" : "mr-4"}`}>
                {iconSource === 'FontAwesome' && <FontAwesome name={iconName} size={16} color="black" />}

                {iconSource === 'MaterialCommunityIcons' && <MaterialCommunityIcons name={iconName} size={20} color="black" />}

                {iconSource === 'Entypo' && <Entypo name={iconName} size={20} color="black" />}

                {iconSource === 'MaterialIcons' && <MaterialIcons name={iconName} size={20} color="black" />}
            </View>
            <View className="h-full justify-center items-center">
                <Text className="text-black font-normal text-lg">{value}</Text>
            </View>
        </View>
  )
}

export const AfterScrollBarDetailsComponent = ({ value, iconName, iconSource }: AfterScrollBarDetailsComponentProps) => {
    return(
        <View className="w-full h-14 border-b border-b-gray-300 flex flex-row justify-start items-center">
             <View className="h-full justify-center items-center mr-4">
                {iconSource === 'FontAwesome' && <FontAwesome name={iconName} size={16} color="black" />}
                {iconSource === 'MaterialCommunityIcons' && <MaterialCommunityIcons name={iconName} size={20} color="black" />}
                {iconSource === 'Entypo' && <Entypo name={iconName} size={20} color="black" />}
            </View>
            <View className="h-full justify-center items-center">
                <Text className="text-black font-normal text-base">{value}</Text>
            </View>
        </View>
    )
}

export const ImageComponent = ({ uri }: ImageComponentProps) => {
    return(
        <View className="w-[90%] my-6">
            <Image source={{uri}} className="w-full h-80"/>
        </View>
    )
}