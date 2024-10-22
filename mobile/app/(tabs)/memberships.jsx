import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton'

const memberships = () => {
  return (
    <>
      <View className="p-3 pt-8">
        <View className="p-3 flex flex-col gap-y-[10px] bg-[#cfcdcd] w-full h-[200px]">
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
              handlePress={() => router.push("")}
              containerStyles="bg-[#52AB99] mr-[0px] ml-[0px] "
              textStyles="text-black text-[16px]" 
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