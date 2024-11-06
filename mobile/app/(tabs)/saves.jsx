import React from 'react';
import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import AvailableGyms from '../../components/home/availableGyms';
import { useSavedGyms } from '../SavedGymsContext';
import { useRouter } from 'expo-router';  // Import useRouter

const Saves = () => {
  const { savedGyms } = useSavedGyms();
  const router = useRouter();  // Get the router instance

  const handleGymPress = (gym) => {
    // Navigate to gymDetails screen when a gym is pressed
    router.push(`/gymDetails?id=${gym.id}`);  // Pass the gym ID if needed
  };

  return (
    <SafeAreaView className="flex-1 p-3 pt-14">
      <View className="w-full">
        {savedGyms.length > 0 ? (
          savedGyms.map((gym) => (
            <TouchableOpacity key={gym.id} onPress={() => handleGymPress(gym)}>
              <AvailableGyms gym={gym} />
            </TouchableOpacity>
          ))
        ) : (
          <Text>No saved gyms yet</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Saves;
