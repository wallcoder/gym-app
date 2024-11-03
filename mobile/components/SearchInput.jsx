import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { icons } from "../constants";

const SearchInput = () => {
  

  return (
    <View className=" flex flex-row justify-between items-center  w-full h-[40px] p-[3px] pr-[8px] bg-black-100 rounded-md border-2 border-[#a8a7a7] focus:border-secondary">
      <TextInput
        className="text-[16px] ml-[10px] mt-0.5 text-black  font-pregular"
        
        placeholder="Gym name or location"
        placeholderTextColor="#a8a7a7"
        
      />
      <View>
        <Ionicons name="search" size={24} color="#52AB99" />
      </View>
      
      
    </View>
  );
};

export default SearchInput;
