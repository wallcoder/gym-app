import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton'
import { router } from "expo-router";

const memberships = () => {
  return (
    <>
      <View className="p-3 pt-10">
        <View className="p-3 flex flex-col gap-y-[10px] bg-[#d8d8d8] w-full h-[200px] rounded-2xl">
          <View>
            <Text className="font-bold ">
              Lotus Gym
            </Text>
            <Text>
              Monthly Plan
            </Text>
            <Text>
              Rs 1000/month
            </Text>
          </View>
          <Text className="font-bold text-[#52AB99]">
            ACTIVE
          </Text>
          <View className=" ">
            <CustomButton 
              title="View Card"
              handlePress={() => router.push("/membershipsCard")}
              containerStyles="bg-[#52AB99] "
              textStyles="text-white text-[16px] " 
            />

          </View>
        </View>
        <View>
          
        </View>
      </View>
    </>
  )
}

export default memberships