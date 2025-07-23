import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="screens/ladypage1"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/ladypage2"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/ChatScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/SurveyScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/HomeScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/ChatwithDriver"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/TripFeedbackScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/CarRentalScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/ConstractScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/Index"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
