import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

const Header = () => {
  const handleSearchPress = () => {
    // Navigate to the search page
    router.push('/searchPage'); // Assuming you have a "searchPage"
  };
  const handleMapPress = () => {
    router.push("/mapIntegrated")
  };
  return (
    <>
        <View className="flex flex-row justify-between items-center  w-full mt-[30px]">
          <View className="flex flex-row justify-center items-center">
            <TouchableOpacity onPress={handleMapPress}>
              <Ionicons name="location" size={24} color="#52AB99" />
            </TouchableOpacity>
            
            <View className="ml-[5px]  flex flex-col">
              <Text className="text-[12px]">
                Appletree Town
              </Text>
              <Text className="text-[12px]">
                Divided States of antarctica
              </Text>
            </View>
          </View>
          <View className="flex flex-row ">
            <TouchableOpacity className="mr-[20px]" onPress={handleSearchPress}>
              <Ionicons name="search" size={24} color="#52AB99" />
            </TouchableOpacity>
            <Ionicons  name="notifications" size={24} color="#52AB99" />

          </View>
        </View>
    </>
  )
}

export default Header
