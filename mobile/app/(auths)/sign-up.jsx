import { Text, View, ScrollView, Keyboard, TouchableWithoutFeedback } from "react-native";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import FormField from "../../components/FormField";
import { useState } from "react";
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    LastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 20, alignItems: "center" }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled" 
      >
        <Text className="mt-[50px]  text-[20px] text-black text-center">
          Sign Up
        </Text>

        <View className="justify-center items-center">
          
          <FormField
            title="First Name"
            value={form.firstName}
            handleChangeText={(e) => setForm({ ...form, firstName: e })}
            otherStyles="mt-[30px]"
            keyboardType="text"
            placeholder="First Name"
          />
          
          <FormField
            title="Last Name"
            value={form.LastName}
            handleChangeText={(e) => setForm({ ...form, LastName: e })}
            otherStyles="mt-[30px]"
            keyboardType="text"
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
          />

          <FormField
            title="Confirm Password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mt-[30px]"
            placeholder="Confirm Password"
          />

          <CustomButton
            title="Sign Up"
            handlePress={() => router.push("")}
            containerStyles="bg-[#52AB99] mt-[40px] mr-[20px] ml-[20px] w-[320px]"
          />

          <View className="mt-[30px] flex justify-center flex-row">
            <Ionicons name="arrow-back" size={24} color="black" />
            <Link href="../" className="text-[16px] font-psemibold text-[#52AB99]">
              Go back
            </Link>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
