import { Stack } from "expo-router";
// import { useFonts } from "expo-font";
export default function RootLayout() {
// useFonts({
//   "roboto":require("./../assets/fonts/Roboto-Regular.ttf")
// })

  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auths)" />
      
    </Stack>
  );
}
