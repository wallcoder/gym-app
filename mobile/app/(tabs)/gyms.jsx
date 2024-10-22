import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/home/header';
import SearchInput from '../../components/SearchInput';
import AvailableGyms from '../../components/home/availableGyms';
import { router } from 'expo-router'; // Import the router

const Gyms = () => {
  const [inputBgColor, setInputBgColor] = useState('transparent');

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 10) {
      setInputBgColor('#fff'); 
    } else {
      setInputBgColor('transparent'); 
    }
  };

  const handleGymPress = () => {
    // Navigate to a new page when a gym is pressed
    router.push('/gymDetails'); // Assuming you have a page named "gymDetails"
  };

  return (
    <View className="">
      <View style={{ position: 'absolute', top: 0, width: '100%', zIndex: 10 }}>
        <View className="items-center h-[130px]" style={{ backgroundColor: inputBgColor }}>
          <Header />
          <View className="">
            <SearchInput />
          </View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingTop: 120 }} 
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View className="flex items-center">
          <View className="mt-[10px] px-4">
            <Text className="font-semibold mb-[10px] text-[12px] text-black text-center">
              TOP GYMS AVAILABLE
            </Text>
            {/* Wrap each AvailableGyms component with TouchableOpacity */}
            <TouchableOpacity onPress={handleGymPress}>
              <AvailableGyms />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGymPress}>
              <AvailableGyms />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGymPress}>
              <AvailableGyms />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGymPress}>
              <AvailableGyms />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGymPress}>
              <AvailableGyms />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGymPress}>
              <AvailableGyms />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Gyms;
