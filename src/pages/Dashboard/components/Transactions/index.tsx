import { MONTH } from "@/src/config/contants";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { TransactionOption } from "./TransactionOption";
import { cn } from "@/src/utils/cn";
import { formatCurrency } from "@/src/utils/formatCurrency";
import { CategoryIcon } from "@/src/assets/icons/CategoryIcon";
import { useTransactionsController } from "./useTransactionController";
import emptyImage from "@/src/assets/empty.png";
import { formateDate } from "@/src/utils/formatDate";

const ITEM_WIDTH = 70;

export function Transactions() {
  const areValueVisibility = true;

  const {
    handleChangeFilter,
    filters,
    transactions,
    isInitialLoading,
    isLoading,
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <View className="bg-gray-100 mt-4 h-full rounded-2xl w-full px-4 py-4 flex flex-col">
      {isInitialLoading && (
        <View className="w-full h-full flex flex-row items-center justify-center">
          <ActivityIndicator size={"small"} color={"#087f5b"} />
        </View>
      )}

      {!isInitialLoading && (
        <View className="flex">
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={MONTH}
            initialScrollIndex={filters.month}
            getItemLayout={(_, index) => ({
              length: ITEM_WIDTH,
              offset: ITEM_WIDTH * index,
              index,
            })}
            renderItem={({ item, index }) => (
              <TransactionOption
                onSelectMonth={(monthIndex) => {
                  handleChangeFilter("month")(monthIndex);
                }}
                index={index}
                currentMonth={item}
                isActive={filters.month === index}
              />
            )}
          />

          {isLoading && (
            <View className="flex flex-1 justify-center items-center h-[300px]">
              <ActivityIndicator size={"small"} />
            </View>
          )}

          {!hasTransactions && !isLoading && (
            <View className="items-center justify-center mt-10 flex-col">
              <Image
                source={emptyImage}
                alt="imagem representando lista vazia"
              />
              <Text className="text-gray-700">
                Não encontramos nenhuma transação
              </Text>
            </View>
          )}

          {hasTransactions && !isLoading && (
            <FlatList
              data={transactions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  role="button"
                  onPress={() => {}}
                  className="bg-white mt-4 flex-row p-4 rounded-2xl flex items-center justify-between gap-4"
                >
                  <View className="flex flex-row  items-center gap-3">
                    <CategoryIcon
                      type={item.type === "EXPENSE" ? "expense" : "income"}
                      category={item.category?.icon}
                    />

                    <View>
                      <Text className="font-bold tracking-[-0.5px] block">
                        {item.name}
                      </Text>
                      <Text className="text-sm font-light text-gray-600 tracking-[-0.5px]">
                        {formateDate(new Date(item.date))}
                      </Text>
                    </View>
                  </View>

                  <Text
                    className={cn(
                      "tracking-[0.5px] font-medium",
                      !areValueVisibility && "blur-sm",
                      item.type === "EXPENSE"
                        ? "text-red-800"
                        : "text-green-800"
                    )}
                  >
                    {item.type === "EXPENSE" ? "-" : "+"}
                    {formatCurrency(Number(100))}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
}
