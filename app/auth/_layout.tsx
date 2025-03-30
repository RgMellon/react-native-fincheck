import { Stack } from "expo-router";
import { View } from "react-native";

export default function AuthLayout() {
  return (
    <View className="flex flex-1 bg-gray-50">
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
