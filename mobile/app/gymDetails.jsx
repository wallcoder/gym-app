import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { icons } from '../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import TimeTable from '../components/timeTable';
import Features from '../components/features';
import WorkoutsAvailable from '../components/workoutsAvailable';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';
import MapView, { Marker } from 'react-native-maps'; 

const GymDetails = () => {
  const initialRegion = {
    latitude: 23.740556, 
    longitude: 92.650944, 
    latitudeDelta: 0.01,  
    longitudeDelta: 0.01, 
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex flex-col ">
       
        <Image
          source={icons.wallpaper2}
          className="w-full h-[240px]"
          resizeMode="cover"
        />
      </View>
      <View className="p-3 ">
        <Text className="text-lg font-bold">Lotus Gym</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <Ionicons name="location" size={20} color="#52AB99" />          
          <Text style={{ marginLeft: 8 }}>123 Gym St, Fitness City</Text> 
        </View>
      </View>
      <View className="p-3 pt-0 ">
        <Text className="text-lg font-bold mb-[10px]">Opening Hours</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TimeTable title="Morning" timeTable="5:00 AM 7:00 AM" />
          <TimeTable title="Afternoon" timeTable="12:00 PM 2:00 PM" />
          <TimeTable title="Evening" timeTable="4:30 PM 7:00 PM" />
          <TimeTable title="Night" timeTable="10:00 PM 12:00 PM" />
        </ScrollView>
      </View>
      <View className="p-3 pt-0">
        <Text className="text-lg font-bold mb-[10px]">Features</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Features title="Parking" />
          <Features title="Showers" />
          <Features title="Free Weights" />
          <Features title="Personal Training" />
          <Features title="Group Classes" />
        </ScrollView>
      </View>
      <View className="p-3 pt-0">
        <Text className="text-lg font-bold mb-[10px]">Workouts Available</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <WorkoutsAvailable title="Weight Training" />
          <WorkoutsAvailable title="Cardio" />
          <WorkoutsAvailable title="Boxing" />
        </ScrollView>
      </View>
      <MapView
        style={{ width: '100%', height: 240 }} 
        initialRegion={initialRegion}
        showsUserLocation={true} 
      >
        <Marker
          coordinate={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
          }}
          title={"Lotus Gym"} 
        />
      </MapView>
      <View className="p-3 pt-0">
        <Text className="text-lg font-bold mb-[10px]">Rule</Text>
        <Text className="text-[16px] mb-[10px]">No heavy lifting without proper spotter</Text>
        <Text className="text-[16px] mb-[10px]">Bring your own towel</Text>
      </View>
      <View className="p-3 pt-0">
        <Text className="text-lg font-bold mb-[10px]">Contact Us</Text>
        <Text className="text-[16px] mb-[10px] ">Phone : 8999126124</Text>
        <Text className="text-[16px] mb-[10px] ">Email : lotusgym@gmail.com</Text>
      </View>
      <View className="p-3 pt-0">
        <Text className="text-lg font-bold mb-[10px]">Rating</Text>
        <Text className="text-[16px] mb-[10px] ">rate </Text>
      </View>
      <View className="p-3 pt-0">
        <CustomButton 
          title="Get Membership"
          handlePress={() => router.push("/membershipsPlans")}
          containerStyles="bg-[#52AB99]"
          textStyles="text-white text-lg"
        />
      </View>
    </ScrollView>
  );
};

export default GymDetails;
