import { View, Text } from 'react-native'
import React from 'react'

const timeTable = ({title,otherStyle,timeTable}) => {
  return (
    <>
        <View className={`p-3 mr-[10px] bg-[#C8D8E5] w-[150px] h-[70px] rounded-lg ${otherStyle}`}>
            <Text className="text-[#52AB99]">
                {title}
            </Text>
            <Text>
                {timeTable}
            </Text>
        </View>
    </>
  )
}

export default timeTable