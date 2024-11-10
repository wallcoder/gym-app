import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';  // Import axios for API calls
import CustomButton from '../../components/CustomButton';

const ProfileScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from the backend using the token
  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        // Make an API request to the backend to get user data
        const response = await axios.post('/user-token', {}, {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        });

        setUser(response.data); // Set the user data from the response
      } else {
        setError('No token found');
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
      setError('Failed to fetch user data');
    } finally {
      setLoading(false); // Set loading to false once data is fetched or an error occurs
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data when the component mounts
  }, []);

  const goToEditProfile = () => {
    router.push('/editProfile');
  };

  return (
    <SafeAreaView className="flex-1 p-3">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <Text className="text-center mt-[50px] text-[24px]">Profile</Text>
        </View>

        {loading ? ( // Show a loading message or spinner while fetching data
          <Text className="text-center">Loading user data...</Text>
        ) : error ? ( // Show error message if something goes wrong
          <Text className="text-center text-red-500">{error}</Text>
        ) : user ? ( // Display user data if successfully fetched
          <View className="w-full flex-col justify-between flex mt-[20px]">
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row">
                <Ionicons name="person" size={45} color="#52AB99" />
                <View className="ml-[10px]">
                  <Text className="font-bold">{user.firstName} {user.lastName}</Text>
                  <Text>{user.email}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={goToEditProfile}>
                <Ionicons name="pencil" size={35} color="#52AB99" />
              </TouchableOpacity>
            </View>
            <View className="mt-auto mb-[20px]">
              <CustomButton
                title="Logout"
                handlePress={() => {
                  AsyncStorage.removeItem('authToken'); // Clear the token on logout
                  router.push('/index'); // Redirect to login page
                }}
                containerStyles="bg-[#52AB99]"
                textStyles="text-white text-lg"
              />
            </View>
          </View>
        ) : (
          <Text className="text-center">User data is not available</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;





