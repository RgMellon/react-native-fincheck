import { cn } from "@/src/utils/cn";
import { Text, TouchableOpacity } from "react-native";

interface TransactionOptionProps {
  isActive: boolean;
  currentMonth: string;
  index: number;
  onSelectMonth(index: number): void;
}

export function TransactionOption({
  isActive,
  currentMonth,
  index,
  onSelectMonth,
}: TransactionOptionProps) {
  return (
    <TouchableOpacity
      onPress={() => onSelectMonth(index)}
      className={cn(
        "w-[70px] h-12 my-4 items-center ml-4 justify-center rounded-full",
        isActive && "bg-white"
      )}
    >
      <Text className="text-gray-800 text-sm tracking-[-0.5px] font-medium">
        {currentMonth}
      </Text>
    </TouchableOpacity>
  );
}
