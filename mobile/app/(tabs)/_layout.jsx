import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SavedGymsProvider } from '../SavedGymsContext';

const TabLayout = () => {
  return (
    <SavedGymsProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#52AB99',
        }}
      >
        <Tabs.Screen
          name="gyms"
          options={{
            tabBarLabel: 'Gyms',
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="memberships"
          options={{
            tabBarLabel: 'Memberships',
            tabBarIcon: ({ color }) => (
              <Ionicons name="document-text-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="saves"
          options={{
            tabBarLabel: 'Saves',
            tabBarIcon: ({ color }) => (
              <Ionicons name="bookmark" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </SavedGymsProvider>
  );
};

export default TabLayout;
