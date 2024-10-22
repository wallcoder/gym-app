import { ActivityIndicator, Text, TouchableOpacity,Image } from "react-native";
import { icons } from "../constants";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={` rounded-full min-h-[50px] flex flex-row items-center justify-center flex-r ${containerStyles} ${title === "View Card"? "ml-0 mr-0" : "mr-[20px] ml-[20px]"} w-[320px] `}
      
    >
        {title === "Login With Google" && (
            
            <Image
                source={icons.google}
                className="w-6 h-6 mr-[8px]"
                resizeMode="contain"
            />
            
        )}
        <Text className={`text-white font-semibold text-[20px] ${textStyles}`}>
            {title}
        </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;