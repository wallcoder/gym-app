import { View, Text,ImageBackground } from 'react-native'
import React from 'react'
import { icons } from '../../constants'

const AvailableGyms = ({containerStyle}) => {
  return (
    <>
        <View className={`border-[1px] rounded-2xl border-[#b4b0b0] border-solid w-full h-[240px] overflow-hidden mb-[10px] ${containerStyle}`}>
        
            <ImageBackground
                source={icons.gymImage}
                className="w-full h-[160px] rounded-2xl justify-center items-center "
                resizeMode="cover"
                style={{ borderRadius: 16 }} 
            >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Bro, I'm here</Text>
            </ImageBackground>
        
        
            <View className="p-4">
                <Text className="text-lg font-semibold">Lotus Gym</Text>
                <Text className="text-sm text-gray-500">Lowland Street, Green Valley</Text>

                <View>
                
                </View>
            </View>
        </View>
    </>
  )
}

export default AvailableGyms