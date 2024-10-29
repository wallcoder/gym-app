import { View, Text, Modal, TextInput ,SafeAreaView} from 'react-native';
import { router } from "expo-router";
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";

const ForgottenPassword = () => {
  const [form, setForm] = useState({
    email: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [otp, setOtp] = useState("");

  const handleResetPassword = () => {
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 p-3">
    <>
      <Text className="text-black text-[18px] text-center mt-[50px] ">Forgotten Password</Text>
      <View className="flex justify-center items-center h-full">
        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mb-[30px]"
          keyboardType="email-address"
          placeholder="Email"
        />
        <CustomButton
          title="Reset password"
          handlePress={handleResetPassword}
          containerStyles="bg-[#52AB99] mt-[8px] mx-5 w-full"
          textStyles="text-white text-[16px]"
        />
        <View className="mt-[30px] flex flex-row items-center">
          <Ionicons name="arrow-back" size={24} color="black" />
          <Link href="../index" className="text-[16px] font-semibold text-[#52AB99] ml-2">
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
                router.push("/setPassword"); 
              }}
              containerStyles="bg-[#52AB99] mt-5 w-full"
              textStyles="text-white text-[16px]"
            />
          </View>
        </View>
      </Modal>
    </>
    </SafeAreaView>
  );
}

export default ForgottenPassword;
