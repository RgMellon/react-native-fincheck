import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useDashboard } from "../useDashboard";

export function FavIcon() {
  const { openMenu } = useDashboard();
  return (
    <TouchableOpacity
      onPress={openMenu}
      activeOpacity={0.9}
      className="w-14 h-14 items-center flex flex-row justify-center bg-teal-900 rounded-full absolute right-0 -bottom-0"
    >
      <Ionicons name="add" color={"#fff"} />
    </TouchableOpacity>
  );
}
