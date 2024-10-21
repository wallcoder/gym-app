import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const Header = () => {
  return (
    <>
        <View className="flex flex-row justify-between items-center  w-[340px] mt-[30px]">
          <View className="flex flex-row justify-center items-center">
            <Ionicons name="location" size={24} color="#52AB99" />
            <View className="ml-[5px]  flex flex-col">
              <Text className="text-[12px]">
                Appletree Town
              </Text>
              <Text className="text-[12px]">
                Divided States of antarctica
              </Text>
            </View>
          </View>
          <Ionicons name="notifications" size={24} color="#52AB99" />
        </View>
    </>
  )
}

export default Header