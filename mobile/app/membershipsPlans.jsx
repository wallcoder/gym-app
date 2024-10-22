import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'

const membershipsPlans = () => {
  return (
    <>
      <View className="p-3 pt-10 ">
        <View className="rounded-2xl p-3 flex flex-row justify-between gap-y-[10px] bg-[#d8d8d8] w-full">
          <View>
            <Text className="font-bold mb-[2px]">
              Monthly Plan
            </Text>
            <Text>
              Rs 1000/month
            </Text>
          </View>
          <View>
            <CustomButton 
                title="Buy"
                handlePress={() => router.push("")}
                containerStyles="bg-[#52AB99] w-[100px] h-[35px] "
                textStyles="text-white text-lg "
            />
          </View>
          
        </View>
      </View>
    </>
  )
}

export default membershipsPlans