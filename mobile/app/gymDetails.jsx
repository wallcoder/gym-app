import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { icons } from '../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import TimeTable from '../components/timeTable';
import Features from '../components/features';
import WorkoutsAvailable from '../components/workoutsAvailable';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';

const GymDetails = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex flex-col ">
        <Image
          source={icons.wallpaper2}
          className="w-[360px] h-[240px]"
          resizeMode="contain"
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
          
          <TimeTable
            title="Morning"
            otherStyle=""
            timeTable="5:00 AM 7:00 AM"
          />
          <TimeTable
            title="Afternoon"
            otherStyle=""
            timeTable="12:00 PM 2:00 PM"
          />
          <TimeTable
            title="Evening"
            otherStyle=""
            timeTable="4:30 PM 7:00 PM"
          />
          <TimeTable
            title="Night"
            otherStyle=""
            timeTable="10:00 PM 12:00 PM"
          />
        </ScrollView>
      </View>
      <View className="p-3 pt-0">
        <Text className="text-lg font-bold mb-[10px]">Features</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
          <Features 
            title="Parking"
            otherStyle=""
            textStyle="text-center"
          />
          <Features 
            title="Parking"
            otherStyle=""
            textStyle="text-center"
          />
          <Features 
            title="Parking"
            otherStyle=""
            textStyle="text-center"
          />
          <Features 
            title="Parking"
            otherStyle=""
            textStyle="text-center"
          />
          <Features 
            title="Parking"
            otherStyle=""
            textStyle="text-center"
          />
          
        </ScrollView>
      </View>
      <View className="p-3 pt-0">
        <Text className="text-lg font-bold mb-[10px]">Workouts Available</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
          <WorkoutsAvailable 
            title="Weight Training"
          />
          <WorkoutsAvailable 
            title="cardio"

          />
          <WorkoutsAvailable 
            title="Boxing"
          />
        </ScrollView>
      </View>
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
