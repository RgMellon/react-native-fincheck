import { Slot, Stack } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import headerLogo from "../../src/assets/icons/header-logo.png";
import { useDashboard } from "@/src/pages/Dashboard/useDashboard";

export default function DashboardLayout() {
  return (
    <SafeAreaView className="p-4 flex flex-1 bg-gray-50">
      <View className="flex w-full flex-row items-center justify-between">
        <Image source={headerLogo} className="w-[106px] h-[24px]" />
        <View className="bg-teal-50 rounded-full w-12 h-12 justify-center items-center">
          <Text className="text-colors-teal-900 font-bold">RM</Text>
        </View>
      </View>

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#fff",
          },
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="transaction"
          options={{
            presentation: "containedTransparentModal",
            animation: "fade_from_bottom",
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
