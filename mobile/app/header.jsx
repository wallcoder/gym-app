import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import NotificationsModal from './NotificationsModal';
const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearchPress = () => {
    router.push('/searchScreen'); 
  };

  const handleMapPress = () => {
    router.push('/mapIntegrated');
  };

  const handleNotificationPress = () => {
    setModalVisible(true); 
  };

  const closeModal = () => {
    setModalVisible(false); 
  };

  return (
    <>
      <View className="flex flex-row justify-between items-center w-full mt-[30px]">
        <View className="flex flex-row justify-center items-center">
          <TouchableOpacity onPress={handleMapPress}>
            <Ionicons name="location" size={24} color="#52AB99" />
          </TouchableOpacity>

          <View className="ml-[5px] flex flex-col">
            <Text className="text-[12px]">Appletree Town</Text>
            <Text className="text-[12px]">Divided States of Antarctica</Text>
          </View>
        </View>
        <View className="flex flex-row">
          <TouchableOpacity className="mr-[20px]" onPress={handleSearchPress}>
            <Ionicons name="search" size={24} color="#52AB99" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNotificationPress}>
            <Ionicons name="notifications" size={24} color="#52AB99" />
          </TouchableOpacity>
        </View>
      </View>

      <NotificationsModal visible={modalVisible} onClose={closeModal} />
    </>
  );
};

export default Header;
