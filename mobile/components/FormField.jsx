import { useState } from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = title === "Password" || title === "Confirm Password";

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className="w-full h-[50px] px-4 border-b-[1px] border-black focus:border-secondary flex flex-row items-center">
        {/* Add icons for specific titles */}
        {title === "First Name" && (
          <Ionicons name="person" size={24} color="#52AB99" />
        )}
        {title === "Last Name" && (
          <Ionicons name="person" size={24} color="#52AB99" />
        )}
        {title === "Email" && (
          <Ionicons name="mail-outline" size={24} color="#52AB99" />
        )}
        {isPasswordField && (
          <Ionicons name="lock-open-outline" size={24} color="#52AB99" />
        )}

        <TextInput
          className="ml-[8px] flex-1 text-black font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={isPasswordField && !showPassword}  
          {...props}
        />

       
        {isPasswordField && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
