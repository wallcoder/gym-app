import { View, Text } from 'react-native'
import { Redirect, router } from "expo-router";
import React from 'react'
import CustomButton from '../../components/CustomButton'
import FormField from '../../components/FormField';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";

const ForgottenPassword = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  return (
    <>
      <Text className="text-black text-[18px] text-center mt-[50px]">Forgotten Password</Text>
      <View className="flex justify-center items-center h-full ">
        <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mb-[30px] "
            keyboardType="email-address"
            placeholder="Email"
          />
        <CustomButton
          title="Reset password"
          handlePress={() => router.push("../index")}
          containerStyles="bg-[#52AB99] mt-[8px]"
          textStyles="text-white text-[16px]"
        />
        <View className="mt-[30px] flex justify-center  flex-row ">
          <Ionicons name="arrow-back" size={24} color="black" />
          <Link
            href="../index"
            className="text-[16px] font-psemibold text-[#52AB99]"
          >
            Go back
          </Link>
        </View>
      </View>
    </>
  )
}

export default ForgottenPassword