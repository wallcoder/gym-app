import { View, Text } from 'react-native'
import React from 'react'

const features = ({title,otherStyle,textStyle}) => {
  return (
    <>
        <View className="flex mr-[10px]  flex-col ">
            <View className=" bg-[#52AB99] mb-[10px]  w-[70px] h-[70px] rounded-full">
            </View>
            <Text className={`${textStyle}`}>
                {title}
            </Text>
        </View>
    </>
  )
}

export default features