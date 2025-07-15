import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


export default function RootLayout() {

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="screens/ladypage1" options={{ headerShown: false }} />
        <Stack.Screen name="screens/ladypage2" options={{ headerShown: false }} />
        <Stack.Screen name="screens/ChatScreen" options={{ headerShown: false }} />
        <Stack.Screen name="screens/SurveyScreen" options={{ headerShown: false }} />
        <Stack.Screen name="screens/HomeScreen" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
