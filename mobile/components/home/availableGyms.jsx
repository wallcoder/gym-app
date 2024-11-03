import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const AvailableGyms = ({ containerStyle, gym }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkPress = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <View className={`border-[1px] rounded-2xl border-[#b4b0b0] border-solid w-full h-[255px] overflow-hidden mb-[10px] ${containerStyle}`}>
      <ImageBackground
        source={gym.image} // Use the image from the gym data
        className="w-full h-[160px] rounded-2xl pt-[5px]"
        resizeMode="cover"
        style={{ borderRadius: 16 }}
      >
        {gym.recommended && (
          <View
            className="ml-[5px] rounded-full p-1 pl-[15px] w-[160px] h-[30px]"
            style={{ backgroundColor: 'rgba(1, 1, 1, 0.5)' }}
          >
            <Text className="w-full h-full text-white">Recommended</Text>
          </View>
        )}
      </ImageBackground>

      <View className="pl-3 pr-3 pt-[5px] flex flex-row justify-between">
        <View>
          <Text className="text-lg font-semibold">{gym.name}</Text>
          <Text className="text-sm text-gray-500">{gym.location}</Text>
          <View className="mt-[4px] flex flex-row">
            <Ionicons name="star" size={24} color="#ffcc34" style={{ marginRight: 5 }} />
            <Text>{gym.rating}</Text>
          </View>
        </View>
        <View className="mt-[8px] flex flex-row">
          <TouchableOpacity onPress={handleBookmarkPress}>
            <Ionicons 
              name="bookmark" 
              size={24} 
              color={isBookmarked ? "#52AB99" : "gray"} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 10 }}>
            <Ionicons 
              name="share-social" 
              size={24} 
              color="#52AB99" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AvailableGyms;
