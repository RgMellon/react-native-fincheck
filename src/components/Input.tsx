import { TextInput, TextInputProps, View, Text } from "react-native";
import { cn } from "../utils/cn";
import Ionicons from "@expo/vector-icons/Ionicons";
import { forwardRef } from "react";

type InputProps = {
  label: string;
  error?: string;
  value?: string;
  onChangeText?: (text: string) => void;
} & TextInputProps;

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, value, onChangeText, ...props }: InputProps, ref) => {
    return (
      <View>
        <TextInput
          ref={ref}
          value={value}
          placeholder={label}
          placeholderTextColor="#495057"
          onChangeText={onChangeText}
          className={cn(
            "bg-white rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 w-full pt-4 peer outline-none placeholder-shown:pt-0 focus:border-gray-600",
            error && "!border-red-900"
          )}
          {...props}
        />

        {error && (
          <View className="mt-2 flex flex-row items-center">
            <Ionicons name="close-circle-outline" color={"#e03131"} />
            <Text className="ml-2 text-sm text-red-900">{error}</Text>
          </View>
        )}
      </View>
    );
  }
);
