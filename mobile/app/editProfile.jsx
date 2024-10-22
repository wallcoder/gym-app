
import React, { useState } from 'react';
import { SafeAreaView, Text, View, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';

const EditProfileScreen = () => {
  const [form, setForm] = useState({
    firstName: "",
    LastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  return (
    <SafeAreaView className="flex-1 p-3 pt-10">
      <Text className="text-center text-[24px]">Edit Profile</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="mt-4">
          <FormField
            title="First Name"
            value={form.firstName}
            handleChangeText={(e) => setForm({ ...form, firstName: e })}
            otherStyles="mt-[30px]"
            keyboardType="default"
            placeholder="First Name"
          />
          
          <FormField
            title="Last Name"
            value={form.LastName}
            handleChangeText={(e) => setForm({ ...form, LastName: e })}
            otherStyles="mt-[30px]"
            keyboardType="default"
            placeholder="Last Name"
          />
          
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-[30px]"
            keyboardType="email-address"
            placeholder="Email"
          />
          
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-[30px]"
            placeholder="Password"
            secureTextEntry={true} 
          />

          <FormField
            title="Confirm Password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mt-[30px]"
            placeholder="Confirm Password"
            secureTextEntry={true} 
          />
        
          <CustomButton
            title="Update"
            containerStyles="bg-[#52AB99] mt-[8px] mr-[20px] mt-[45px] w-full"
            textStyles="text-white font-bold text-lg"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
