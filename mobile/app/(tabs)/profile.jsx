import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const router = useRouter(); 
  const goToEditProfile = () => {
    router.push('/editProfile'); 
  };

  return (
    <SafeAreaView className="flex-1 p-3">
      <View>
        <Text className="text-center mt-[50px] text-[24px]">Profile</Text>
      </View>
      <View className="mt-[20px] flex flex-row justify-between items-center">
        <View className="flex flex-row">
          <Ionicons name="person" size={45} color="#52AB99" />
          <View className="ml-[10px]">
            <Text className="font-bold">John Wakaka</Text>
            <Text>johnwakaka@gmail.com</Text>
          </View>
        </View>
        <TouchableOpacity onPress={goToEditProfile}>
          <Ionicons name="pencil" size={35} color="#52AB99" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
