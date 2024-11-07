import { TouchableOpacity, Text } from "react-native"


interface CustomButtonProps {
    onPress: () => void;
    title: string;
    className?: string;
    [key: string]: any;
}

const CustomButton: React.FC<CustomButtonProps> = ({onPress, title, className, ...props}) => {
    return (
        <TouchableOpacity onPress={onPress} className={`bg-black flex flex-row justify-center items-center ${className}`}>
            <Text>{title}</Text>

        </TouchableOpacity>
    )
}

export default CustomButton;