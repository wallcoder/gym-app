import { View, Text , SafeAreaView} from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton'
import FormField from '../../components/FormField'
import { useState } from "react";

const setPassword = () => {
    const [form, setForm] = useState({
        password: "",
        confirmPassword: ""
      });
      const handleSignUp = () => {
        console.warn("bro")
      };
  return (
    <>
        <SafeAreaView className="flex-1 p-3">
            <View className="flex justify-center items-center">
            <FormField
                title="Password"
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles="mt-8"
                placeholder="Password"
            />

            <FormField
                title="Confirm Password"
                value={form.confirmPassword}
                handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
                otherStyles="mt-8"
                placeholder="Confirm Password"
            />

            <CustomButton
                title="Update"
                handlePress={handleSignUp}
                containerStyles="bg-[#52AB99] mt-10 w-full"
            />
            </View>
        </SafeAreaView>
    </>
  )
}

export default setPassword