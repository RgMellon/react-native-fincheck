import { cn } from "@/src/utils/cn";
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AccountCard } from "./AccountCard";
import { useAccountController } from "./useAccountController";
import { formatCurrency } from "@/src/utils/formatCurrency";

export function Accounts() {
  const areValueVisibility = true;

  const { accounts, currentBalance, isLoading } = useAccountController();

  return (
    <View className="bg-teal-900 rounded-2xl w-full h-[420px] px-8 py-8 flex">
      {isLoading && (
        <View className="flex justify-center items-center w-full h-full">
          <ActivityIndicator size={"small"} color={"#fafafa"} />
        </View>
      )}

      <View>
        <Text className="text-white block text-base">Saldo Total</Text>

        <View className="flex flex-row items-center gap-4 mt-5">
          <Text
            className={cn(
              "text-[32px] tracking-[-1px] text-white",
              !areValueVisibility && "blur-sm"
            )}
          >
            {formatCurrency(currentBalance)}
          </Text>

          <TouchableOpacity
            onPress={() => {}}
            className="w-8 h-8 flex items-center justify-center"
          >
            <Ionicons name="eye" color={"#fafafa"} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-10">
        <Text className="text-white tracking-[-1px] text-lg font-light">
          Minhas contas
        </Text>

        <View className="mt-4">
          <FlatList
            pagingEnabled
            decelerationRate="fast"
            horizontal
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => <AccountCard data={item} />}
            data={accounts}
          />
        </View>
      </View>
    </View>
  );
}
