import { Text, View, Image } from "react-native";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import FormField from "../../components/FormField";
import { useState } from "react";
import { Redirect, router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    LastName: "",
    email: "",
    password: "",
  });
  
  return (
    <>
    {/* <Redirect href={"/gyms"}/> */}
      <Text className="mt-[50px]  text-[20px] text-black text-center">
        Sign Up
      </Text>
      <View className=" flex-1 justify-center items-center">
        
        <FormField
          title="firstName"
          value={form.firstName}
          handleChangeText={(e) => setForm({ ...form, firstName: e })}
          otherStyles="mt-[30px]"
          keyboardType="Text"
          placeholder="First Name"
        />
        <FormField
          title="lastName"
          value={form.LastName}
          handleChangeText={(e) => setForm({ ...form, LastName: e })}
          otherStyles="mt-[30px]"
          keyboardType="Text"
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
          otherStyles="mt-[30px] "
          placeholder="Password"
        />
        
        
        <CustomButton
          title="Sign Up"
          handlePress={() => router.push("")}
          containerStyles="bg-[#52AB99] mt-[40px]"
        />
        
        
          <View className="mt-[30px] flex justify-center  flex-row ">
            <Ionicons name="arrow-back" size={24} color="black" />
            <Link
              href="../"
              className="text-[16px] font-psemibold text-[#52AB99]"
            >
              Go back
            </Link>
          </View>
      </View>
    </>
  );
}
