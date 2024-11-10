import { useState } from "react";
import { Text, View, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { router, Link } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import CheckBox from "../components/checkBox";

// Set base URL for all Axios requests
axios.defaults.baseURL = "http://10.0.2.2:3000";

// Axios instance with token interceptor
const axiosInstance = axios.create({
  baseURL: "http://10.0.2.2:3000",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default function Index() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Update form field values
  const handleChangeText = (name, value) => {
    setForm({ ...form, [name]: value });
    setError(""); 
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      setError("Invalid email format");
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post("/login", {
        email: form.email,
        password: form.password,
      });

      // Log the entire response object to check its structure
      console.log("Login response:", response);

      if (response.status === 200 && response.data.token) {
        // Store the JWT token in AsyncStorage
        await AsyncStorage.setItem("authToken", response.data.token);
        console.log("Stored Token:", response.data.token); // Log token from response

        // Retrieve the token from AsyncStorage and log it
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          console.log("Token not found in AsyncStorage");
        } else {
          console.log("Token found:", token); // Log the token to check its contents
        }

        // Redirect to gyms page
        router.push("/gyms");

      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 20, alignItems: "center" }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="justify-center items-center p-3">
          <Text className="text-center mt-[100px] mb-[50px] text-[20px] text-black">Log In</Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => handleChangeText("email", e)}
            otherStyles="mt-[10px]"
            keyboardType="email-address"
            placeholder="Email"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => handleChangeText("password", e)}
            otherStyles="mt-[30px]"
            placeholder="Password"
            secureTextEntry={true}
          />

          {error ? <Text className="text-red-500 mt-[10px]">{error}</Text> : null}

          <View className="mt-[14px] mb-[40px] flex flex-row justify-between w-[320px]">
            <View className="flex flex-row items-center">
              <CheckBox />
              <Text className="text-[16px] text-[#7B7B8B]">Remember me</Text>
            </View>
            <Link href="/forgottenPassword" className="text-[16px] font-psemibold text-[#52AB99]">
              Forgot password?
            </Link>
          </View>

          <CustomButton
            title={isSubmitting ? "Logging in..." : "Log in"}
            handlePress={handleSubmit}
            containerStyles="bg-[#52AB99] w-full"
            disabled={isSubmitting}
            textStyles="w-full text-center"
          />

          <CustomButton
            title="Login With Google"
            handlePress={() => router.push("/sign-in")}
            containerStyles="bg-[#d6d6d6] mt-[8px] w-full"
            textStyles="text-black text-[16px] text-center"
            imageStyle="mr-[10px]"
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black font-pregular">Don't have an account?</Text>
            <Link href="./(auths)/sign-up" className="text-lg font-psemibold text-[#52AB99]">
              Signup
            </Link>
            <Link href="./gyms" className="text-lg font-psemibold text-[#52AB99]">
              gyms
            </Link>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}


