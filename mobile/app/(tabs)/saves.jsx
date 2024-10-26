import React from 'react';
import { SafeAreaView, View } from 'react-native';
import AvailableGyms from '../../components/home/availableGyms';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router'; 

const saves = () => {
  const handleGymPress = () => {
    router.push('/gymDetails'); 
  };
  return (
    <>
      <SafeAreaView className="flex-1 p-3 pt-14">
        <View className="w-full">
          <TouchableOpacity onPress={handleGymPress}>
            <AvailableGyms />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  )
}

export default saves