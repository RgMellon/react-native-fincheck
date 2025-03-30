import { TextInput, TextInputProps } from "react-native";

type InputProps = {
  label: string;
} & TextInputProps;

export function Input({ label, ...props }: InputProps) {
  return (
    <TextInput
      placeholder={label}
      placeholderTextColor="#495057"
      className="bg-white rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 w-full pt-4 peer  outline-none placeholder-shown:pt-0 focus:border-gray-600"
      {...props}
    />
  );
}
