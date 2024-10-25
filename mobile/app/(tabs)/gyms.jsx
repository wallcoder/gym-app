
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/home/header';
import SearchInput from '../../components/SearchInput';
import AvailableGyms from '../../components/home/availableGyms';
import { useRouter } from 'expo-router'; 

const Gyms = () => {
  const [inputBgColor, setInputBgColor] = useState('transparent');
  const router = useRouter(); 

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    setInputBgColor(yOffset > 10 ? '#fff' : 'transparent');
  };

  const handleGymPress = () => {
    router.push('/gymDetails'); 
  };
  
  return (
    <View className="flex-1">
      <View style={{ position: 'absolute', top: 0, width: '100%', zIndex: 10 }}>
        <View className="items-center h-[130px]" style={{ backgroundColor: inputBgColor }}>
          <Header />
          <TouchableOpacity
            
          >
            <SearchInput />
          </TouchableOpacity>
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
            {[...Array(6)].map((_, index) => (
              <TouchableOpacity key={index} onPress={handleGymPress}>
                <AvailableGyms />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Gyms;
