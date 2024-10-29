import { SafeAreaView, View, Text, Animated, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import Header from '../../components/home/header';
import SearchInput from '../../components/SearchInput';
import AvailableGyms from '../../components/home/availableGyms';
import { useRouter } from 'expo-router';

const Gyms = () => {
  const [inputBgColor, setInputBgColor] = useState('transparent');
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const yOffset = event.nativeEvent.contentOffset.y;
        setInputBgColor(yOffset > 10 ? '#fff' : 'transparent');
      },
    }
  );

  const handleGymPress = () => {
    router.push('/gymDetails');
  };

  return (
    <SafeAreaView className="flex-1 p-3 pb-0">
      <View>
        <View className="items-center">
          <Header />
          <TouchableOpacity>
            {/* <SearchInput /> */}
          </TouchableOpacity>
        </View>
      </View>

      <Animated.ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingTop: 30 }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={1}       
        decelerationRate={0.99}     
      >
        <View className="flex items-center w-full">
          <View className=" w-full">
            <Text className="font-semibold mb-[10px] text-lg text-black text-center">
              TOP GYMS AVAILABLE
            </Text>
            {[...Array(20)].map((_, index) => (
              <TouchableOpacity key={index} onPress={handleGymPress}>
                <AvailableGyms containerStyle="w-full" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Gyms;
