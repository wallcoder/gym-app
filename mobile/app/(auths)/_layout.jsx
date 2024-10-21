import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name='/forgottenPassword' options={{headerShown:false}}/>
        <Stack.Screen name='/sign-up' />
      </Stack>
    </>
  )
}

export default AuthLayout