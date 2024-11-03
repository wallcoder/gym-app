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
      <Stack.Screen name="membershipsCard" options={{
        title:"Membership Card",
        headerShown:true
      }}/>
      <Stack.Screen name="gymDetails" options={{
        title:"Lustus Gym",
        headerShown:true
      }}/>
      <Stack.Screen name="membershipsPlans" options={{
        title:"Memberships Plans",
        headerShown:true
      }}/>
      <Stack.Screen name="searchScreen" options={{
        title:"search Screen",
        headerShown:false
      }}/>
      <Stack.Screen name="mapIntegrated" options={{
        title:"map ",
        headerShown:true
      }}/>
      <Stack.Screen name="notifications" options={{
        title: "Notifications",
        headerShown: true
      }} />

    </Stack>
  );
}
