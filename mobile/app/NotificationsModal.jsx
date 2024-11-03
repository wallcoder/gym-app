import { View, Text, TouchableOpacity, Modal } from 'react-native';
import React from 'react';
import { Animated } from 'react-native';

const NotificationsModal = ({ visible, onClose }) => {

  const slideAnim = React.useRef(new Animated.Value(200)).current; 

  React.useEffect(() => {
    if (visible) {
      
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      
      Animated.timing(slideAnim, {
        toValue: 200,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
   
    Animated.timing(slideAnim, {
      toValue: 200,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose(); 
    });
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-center items-end">
        
        <View className="absolute inset-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />

        <Animated.View
          style={{
            transform: [{ translateX: slideAnim }],
            width: 230 , 
            height: '100%', 
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5, 
          }}
        >
          <View className="p-5">
            <Text className="text-lg font-bold">Notifications</Text>
            <View className="mt-4">
              <Text>No new notifications at this moment.</Text>
            </View>
            <TouchableOpacity
              onPress={handleClose} 
              className="mt-4 bg-[#52AB99] rounded p-2"
            >
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default NotificationsModal;
