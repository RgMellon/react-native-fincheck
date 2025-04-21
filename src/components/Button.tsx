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
  variant?: "danger" | "ghost";
} & TouchableOpacityProps;

export function Button({
  disable,
  label,
  className,
  isLoading = false,
  variant,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={disable}
      activeOpacity={0.8}
      className={cn(
        `bg-teal-900 disabled:bg-slate-400 
          px-6 h-12 rounded-2xl disabled:text-gray-400 flex items-center justify-center`,
        variant === "danger" && "bg-red-900",
        variant === "ghost" && "bg-transparent border border-gray-800 "
      )}
      {...props}
    >
      <Text
        className={cn(
          "font-medium text-white",
          variant === "ghost" && "text-gray-800"
        )}
      >
        {isLoading ? <ActivityIndicator size={"small"} /> : label}
      </Text>
    </TouchableOpacity>
  );
}
