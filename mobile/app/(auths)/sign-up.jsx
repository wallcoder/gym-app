import { SafeAreaView, Text, View, ScrollView, Keyboard, TouchableWithoutFeedback, Modal, TextInput } from "react-native";
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSignUp = () => {
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 p-3">
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle="py-5 items-center"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="mt-12 text-2xl text-black text-center">
          Sign Up
        </Text>

        <View className="justify-center items-center">
          <FormField
            title="First Name"
            value={form.firstName}
            handleChangeText={(e) => setForm({ ...form, firstName: e })}
            otherStyles="mt-8"
            keyboardType="text"
            placeholder="First Name"
          />

          <FormField
            title="Last Name"
            value={form.LastName}
            handleChangeText={(e) => setForm({ ...form, LastName: e })}
            otherStyles="mt-8"
            keyboardType="text"
            placeholder="Last Name"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-8"
            keyboardType="email-address"
            placeholder="Email"
          />

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
            title="Sign Up"
            handlePress={handleSignUp}
            containerStyles="bg-[#52AB99] mt-10 mx-5 w-full"
          />

          <View className="mt-8 flex-row items-center">
            <Ionicons name="arrow-back" size={24} color="black" />
            <Link href="../" className="text-lg font-semibold text-[#52AB99] ml-2">
              Go back
            </Link>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-72 p-5 bg-white rounded-lg items-center">
              <Text className="text-xl text-black mb-4">Enter OTP</Text>
              <TextInput
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                placeholder="Enter OTP"
                className="border border-gray-300 p-3 w-full rounded text-center"
              />
              <CustomButton
                title="Verify OTP"
                handlePress={() => {
                  setIsModalVisible(false);
                  router.push(""); 
                }}
                containerStyles="bg-[#52AB99] mt-5 w-full"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
