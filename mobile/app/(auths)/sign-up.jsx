import { SafeAreaView, Text, View, ScrollView, Keyboard, TouchableWithoutFeedback, Modal, TextInput } from "react-native";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import FormField from "../../components/FormField";
import { useState } from "react";
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

export default function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSignUp = async () => {
    console.log(form)
    try {
      const response = await axios.post('/register', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        conPassword: form.confirmPassword,
      });

      if (response.status === 201) {
        handleSendOtp(); // Send OTP on successful registration
      } else {
        if (response.data.passwordMessage) alert(response.data.passwordMessage);
        if (response.data.emailMessage) alert(response.data.emailMessage);
        if (response.data.passwordConMessage) alert(response.data.passwordConMessage);
      }
    } catch (error) {
      console.error("Error in sign-up:", error);
      alert("An error occurred during sign-up. Please try again.");
    }
  };

  const handleSendOtp = async () => {
    try {
      const otpResponse = await axios.post('/send-otp', { email: form.email });
      
      // Adjusted condition to allow any 2xx response status to show the OTP modal
      if (otpResponse.status >= 200 && otpResponse.status < 300) {
        setIsModalVisible(true); // Show OTP modal if OTP is sent successfully
        alert("OTP sent to your email!");
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("An error occurred while sending OTP. Please try again.");
    }
  };
  

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('/verify-otp', {
        email: form.email,
        otp,
      });

      if (response.status === 200) {
        alert("OTP verified successfully!");
        router.push("/gyms"); // Navigate to another page on successful verification
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred during OTP verification. Please try again.");
    }
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
              value={form.lastName}
              handleChangeText={(e) => setForm({ ...form, lastName: e })}
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
                  handlePress={handleVerifyOtp}
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
//shawnms1902@gmail.com
//Shawnlast99@
//dominicvans00@gmail.com