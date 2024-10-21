import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";

const checkBox = () => {
    const [isChecked, setIsChecked] = useState(false);
  return (
    <>
        <View className="mr-[5px]">
            <TouchableOpacity
            
            onPress={() => setIsChecked(!isChecked)}
            >
            <Ionicons
                name={isChecked ? "checkbox" : "square-outline"}
                size={24}
                color={isChecked ? "#52AB99" : "gray"}
            />
            {/* <Text style={{ marginLeft: 10 }}>{isChecked ? "Checked" : "Unchecked"}</Text> */}
            </TouchableOpacity>
        </View>
    </>
  )
}

export default checkBox