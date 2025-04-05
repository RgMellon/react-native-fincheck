import { BankAccountTypeIcon } from "@/src/assets/icons/BankAccountTypeIcon";
import { BankAccount } from "@/src/entities/BankAccount";
import { cn } from "@/src/utils/cn";
import { formatCurrency } from "@/src/utils/formatCurrency";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";

interface AccountCardProps {
  data: BankAccount;
}

export function AccountCard({ data }: AccountCardProps) {
  const { width } = Dimensions.get("window");

  //   const { areValueVisibility, openEditModalBankAccount } = useDashboard();

  const areValueVisibility = true;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="p-4 bg-white w-[88%] rounded-2xl h-[200px] border-b-4 border-teal-950 justify-between"
      onPress={() => {}}
      style={{ width: width * 0.75, marginRight: 16, borderColor: data.color }}
    >
      <View>
        <BankAccountTypeIcon type={data.type} />
        <Text className="text-gray-800 text-2xl font-medium tracking-[-0.5px] mt-4">
          {data.name}
        </Text>
      </View>

      <View>
        <Text
          className={cn(
            "text-gray-800 font-medium tracking-[-0.5px] text-[18px]",
            !areValueVisibility && "blur-md"
          )}
        >
          {formatCurrency(data.currentBalance)}
        </Text>

        <Text className="text-gray-600 text-[15px] mt-2">Saldo atual</Text>
      </View>
    </TouchableOpacity>
  );
}
