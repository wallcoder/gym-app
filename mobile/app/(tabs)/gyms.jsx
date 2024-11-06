import { SafeAreaView, View, Text, Animated, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import Header from '../header';
import AvailableGyms from '../../components/home/availableGyms';
import { useRouter } from 'expo-router';
import { icons } from '../../constants';

const gymsData = [
  {
    id: 1,
    name: 'Lotus Gym',
    location: 'Lowland Street, Green Valley',
    rating: 4.5,
    recommended: true,
    image: icons.gymImage, // Replace with your placeholder image
  },
  {
    id: 2,
    name: 'Iron Paradise',
    location: 'Sunset Boulevard, Uptown',
    rating: 4.7,
    recommended: false,
    image: icons.gymImage, // Replace with another placeholder or same image
  },
  {
    id: 3,
    name: 'FitNation',
    location: 'Maple Road, Midtown',
    rating: 4.2,
    recommended: true,
    image: icons.gymImage,
  },
  {
    id: 4,
    name: 'broooooo',
    location: 'Mafsfasfafdtown',
    rating: 5,
    recommended: true,
    image: icons.gymImage,
  },
  {
    id: 5,
    name: 'nanannanaon',
    location: 'askjakdnawn',
    rating: 4.2,
    recommended: true,
    image: icons.gymImage,
  },
];

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

  // Update handleGymPress to pass gym id to the gymDetails page
  const handleGymPress = (gymId) => {
    router.push({
      pathname: '/gymDetails',
      query: { id: gymId }, // Pass gym id as query param
    });
  };

  return (
    <SafeAreaView className="flex-1 p-3 pb-0">
      <View>
        <View className="items-center">
          <Header />
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
          <View className="w-full">
            <Text className="font-semibold mb-[10px] text-lg text-black text-center">
              TOP GYMS AVAILABLE
            </Text>
            {gymsData.map((gym) => (
              <TouchableOpacity key={gym.id} onPress={() => handleGymPress(gym.id)}>
                <AvailableGyms containerStyle="w-full" gym={gym} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Gyms;
