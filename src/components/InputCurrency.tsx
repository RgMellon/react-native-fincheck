// import CurrencyInput from "react-currency-input-field";
import CurrencyInput from "react-native-currency-input";
import { cn } from "../utils/cn";
import { Text, View } from "react-native";

interface InputCurrencyProps {
  error?: string;
  onChange(value: number): void;
  value: number | string;
  className?: string;
  defaultValue?: string | number;
}

export function InputCurrency({
  error,
  onChange,
  value,
  defaultValue,
  className,
}: InputCurrencyProps) {
  function handleTransform(value: string) {
    return value.length === 0 ? "0" : value;
  }

  return (
    <View>
      <CurrencyInput
        value={Number(value)}
        onChangeValue={onChange}
        prefix="R$ "
        delimiter="."
        separator=","
        precision={2}
        className={cn(
          "w-full flex text-gray-800 text-[32px] font-bold tracking-[-1px] ",
          className
        )}
      />

      {error && (
        <View className="flex gap-2 items-center mt-2">
          <Text className="text-xs  text-red-900">{error}</Text>
        </View>
      )}
    </View>
  );
}
