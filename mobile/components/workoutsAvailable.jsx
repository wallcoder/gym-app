import { View, Text } from 'react-native'
import React from 'react'

const workoutsAvailable = ({title,otherStyle}) => {
  return (
    <>
        <View className={`p-3 mr-[10px] bg-[#C8D8E5] w-[150px] h-[45px] rounded-lg ${otherStyle}`}>
            <Text className="text-[#52AB99] text-center">
                {title}
            </Text>
            
        </View>
    </>
  )
}

export default workoutsAvailable