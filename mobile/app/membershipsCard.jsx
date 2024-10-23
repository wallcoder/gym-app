import { View, Text } from 'react-native'
import React from 'react'

const membershipsCard = () => {
  return (
    <>
      <View className="p-3 pt-10">
        <View className="p-3 flex flex-col gap-y-[10px] bg-[#d8d8d8] w-full h-[200px]">
          <View>
            <Text className="font-bold ">
              Lotus Gym Membership Card
            </Text>
            <Text>
              Jogn Wakaka
            </Text>
            <Text>
              Monthly Plan
            </Text>
                <Text>
                Validity:
                </Text>
                <Text>
                    12/03/24-14/04/24
                </Text>
            <View>
            </View>
          </View>
          <Text className="text-lg font-bold text-[#52AB99]">
            ACTIVE
          </Text>
          
        </View>
        <View>
          
        </View>
      </View>
    </>
  )
}

export default membershipsCard