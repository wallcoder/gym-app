import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { icons } from "../constants";

const SearchInput = () => {
  

  return (
    <View className="mt-[10px] flex flex-row items-center  w-[340px] h-[50px] p-[10px] bg-black-100 rounded-md border-2 border-[#a8a7a7] focus:border-secondary">
      
        <Ionicons name="search" size={24} color="#52AB99" />
      
      <TextInput
        className="text-[16px] ml-[10px] mt-0.5 text-black  font-pregular"
        
        placeholder="Gym name or location"
        placeholderTextColor="#a8a7a7"
        
      />

      
    </View>
  );
};

export default SearchInput;
