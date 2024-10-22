import { Stack } from 'expo-router';
import React from 'react';

const AvailableGymLayout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: true }}>
        
        <Stack.Screen
          name="/gymDetails"
          options={{
            headerShown: true,
            title: "Lustus Gym",  
          }}
        />
      </Stack>
    </>
  );
};

export default AvailableGymLayout;
