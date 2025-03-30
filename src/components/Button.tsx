import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { cn } from "../utils/cn";

type ButtonProps = {
  disable: boolean;
  label: string;
  isLoading?: boolean;
} & TouchableOpacityProps;

export function Button({
  disable,
  label,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={disable}
      activeOpacity={0.8}
      className={cn(
        " w-full px-6 h-12 rounded-2xl flex items-center justify-center",
        !disable ? "bg-teal-900" : "bg-gray-300"
      )}
      {...props}
    >
      <Text className="font-medium text-white">
        {isLoading ? <ActivityIndicator size={"small"} /> : label}
      </Text>
    </TouchableOpacity>
  );
}
