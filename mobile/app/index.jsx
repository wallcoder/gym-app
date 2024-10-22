import { router } from "expo-router";
import { Text, View, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import CustomButton from "../components/CustomButton";
import { Link } from "expo-router";
import FormField from "../components/FormField";
import { useState } from "react";
import CheckBox from "../components/checkBox";

export default function Index() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChangeText = (name, value) => {
    setForm({ ...form, [name]: value });
    setError(""); // Reset error on input change
  };

  const handleSubmit = () => {
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    // Basic email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      setError("Invalid email format");
      return;
    }

    setSubmitting(true);
    router.push("/gyms");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 20, alignItems: "center" }} // Ensure scrollability
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled" // Allow dismissing keyboard when tapping outside
      >
        <View className="justify-center items-center">
          {/* Fixed Content */}
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
            secureTextEntry={true} // Enable password field to be hidden
          />

          {error ? (
            <Text className="text-red-500 mt-[10px]">{error}</Text>
          ) : null}

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
            containerStyles="bg-[#52AB99]"
            disabled={isSubmitting} 
          />

          <CustomButton
            title="Login With Google"
            handlePress={() => router.push("/sign-in")}
            containerStyles="bg-[#d6d6d6] mt-[8px]"
            textStyles="text-black text-[16px]"
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black font-pregular">Don't have an account?</Text>
            <Link href="./(auths)/sign-up" className="text-lg font-psemibold text-[#52AB99]">
              Signup
            </Link>
            <Link href="./(tabs)/memberships" className="text-lg font-psemibold text-[#52AB99]">
            memberships
            </Link>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
