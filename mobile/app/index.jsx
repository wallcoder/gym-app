import { Redirect, router } from "expo-router";
import { Text, View, Image } from "react-native";
import CustomButton from "../components/CustomButton";
import { Link } from "expo-router";
import FormField from "../components/FormField";
import { useState } from "react";
import CheckBox  from "../components/checkBox";
import { icons } from "../constants";


export default function Index() {
  
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  
  return (
    <>
    {/* <Redirect href={"/gyms"}/> */}
      <Text className=" text-center mt-[50px] text-[20px]  text-black">
        Log In
      </Text>
      <View className=" flex-1 justify-center items-center">
        
        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mt-[10px]"
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
        <View className="mt-[14px] mb-[40px] flex flex-row text-center justify-between w-[320px]">
          <View className="flex flex-row">
            <CheckBox />
            <Text className="text-[16px] text-[#7B7B8B]">
              Remember me
            </Text>
          </View>
          <Link
            href="/forgottenPassword"
            className="text-[16px] font-psemibold text-[#52AB99]"
          >
            Forgot password?
          </Link>
        </View>
        <CustomButton
          title="Log in"
          handlePress={() => router.push("/gyms")}
          containerStyles="bg-[#52AB99]"
        />
        <CustomButton
          title="Login With Google"
          handlePress={() => router.push("/sign-in")}
          containerStyles="bg-[#d6d6d6] mt-[8px]"
          textStyles="text-black text-[16px]"
        />
        
        <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="./(auths)/sign-up"
              className="text-lg font-psemibold text-[#52AB99]"
            >
              Signup
            </Link>
            
          </View>
      </View>
    </>
  );
}
