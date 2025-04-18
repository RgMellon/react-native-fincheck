import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import { cn } from "../utils/cn";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { CategoryIcon } from "../assets/icons/CategoryIcon";
import { useDashboard } from "../pages/Dashboard/useDashboard";

interface Option {
  label: string;
  value: string;
  icon?: string;
}
interface SelectProps {
  error?: string;
  label: string;
  options: Option[];
  value?: string;
  onChange?(value: string): void;
}

export function Select({ error, label, options, onChange }: SelectProps) {
  const { newTransactionType } = useDashboard();
  const [openSelectModal, setOpenSelectModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Option | null>(null);

  function handleOpen() {
    setOpenSelectModal(true);
  }

  function handleClose() {
    setOpenSelectModal(false);
  }

  function onSelectItem(item: Option) {
    if (onChange) {
      onChange(item.value);
    }

    setSelectedValue(item);
    setOpenSelectModal(false);
  }

  return (
    <View>
      <TouchableOpacity
        className={cn(
          "bg-white flex-row items-center justify-between rounded-lg border border-gray-500 px-3 h-[52px] w-full pt-4",
          error && "!border-red-900"
        )}
        onPress={handleOpen}
      >
        <Text className="text-gray-800">
          {!selectedValue ? label : selectedValue.label}
        </Text>
        <Ionicons
          name={!openSelectModal ? "chevron-down" : "chevron-up"}
          color={"#6b7280"}
        />
      </TouchableOpacity>

      {error && (
        <View className="mt-2 flex flex-row items-center">
          <Ionicons name="close-circle-outline" color={"#e03131"} />
          <Text className="ml-2 text-sm text-red-900">{error}</Text>
        </View>
      )}

      <Modal animationType="slide" transparent={true} visible={openSelectModal}>
        <View className="flex-1 justify-end">
          <Pressable
            className="absolute top-0 bottom-0 left-0 right-0 z-0"
            onPress={handleClose}
          >
            <BlurView
              intensity={20}
              tint="dark"
              className="absolute top-0 bottom-0 left-0 right-0"
            />
          </Pressable>

          <View className="w-full bg-gray-50 h-[25%] rounded-t-2xl p-4 z-10">
            <FlatList
              keyExtractor={({ value }) => value}
              data={options}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => onSelectItem(item)}
                  className="w-full flex-row items-center p-4 gap-6"
                >
                  <CategoryIcon
                    type={
                      newTransactionType === "EXPENSE" ? "expense" : "income"
                    }
                    category={item?.icon}
                  />
                  <Text> {item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
