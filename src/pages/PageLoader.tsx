import { ActivityIndicator, View } from "react-native";

export function PageLoader() {
  return (
    <View className="flex flex-1 justify-center  items-center">
      <ActivityIndicator size={"large"} />
    </View>
  );
}
