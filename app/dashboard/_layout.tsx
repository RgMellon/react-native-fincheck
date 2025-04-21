import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardLayout() {
  return (
    <SafeAreaView className="p-4 flex flex-1 bg-gray-50">
      <StatusBar translucent />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#f8f9fa",
          },
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </SafeAreaView>
  );
}
