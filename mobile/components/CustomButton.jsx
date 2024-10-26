import { ActivityIndicator, Text, TouchableOpacity,Image, View } from "react-native";
import { icons } from "../constants";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  imageStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={` rounded-full h-[50px] flex flex-row items-center justify-center flex-r ${containerStyles} ${title === "View Card"? "ml-0 mr-0 " : ""} `}
      
    >
      <View className="w-full flex flex-row justify-center items-center">
        {title === "Login With Google" && (
            <View>
              <Image
                  source={icons.google}
                  className={`w-6 h-6 ${imageStyle} `}
                  resizeMode="contain"
              />
            </View>  
              
                
            )}
            <View>
              <Text className={`text-white font-semibold text-[20px] ${textStyles}`}>
                  {title}
              </Text>  
            </View>
              
      </View>
        
    </TouchableOpacity>
  );
};

export default CustomButton;