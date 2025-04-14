import { AccountIcon } from "@/src/assets/icons/AccountIcon";
import { CategoryIcon } from "@/src/assets/icons/CategoryIcon";
import { BlurView } from "expo-blur";
import {
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDashboard } from "../../useDashboard";
import { router } from "expo-router";

export function MenuModal() {
  const { isMenuOpen, closeMenu, openNewTransactionModal } = useDashboard();

  function handleOpen(type: "INCOME" | "EXPENSE") {
    openNewTransactionModal(type);
    closeMenu();
    router.push("/dashboard/modal/transaction");
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isMenuOpen}>
      <View className="flex-1 justify-end">
        <Pressable
          className="absolute top-0 bottom-0 left-0 right-0 z-0"
          onPress={closeMenu}
        >
          <BlurView
            intensity={20}
            tint="dark"
            className="absolute top-0 bottom-0 left-0 right-0"
          />
        </Pressable>

        <View className="w-full bg-gray-50 h-[35%] rounded-t-2xl p-4 z-10">
          <TouchableOpacity
            className="w-full flex-row items-center p-4 gap-4 mt-4"
            onPress={() => {
              handleOpen("EXPENSE");
            }}
          >
            <CategoryIcon type="expense" />
            <Text> Nova Despesa</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-full flex-row items-center p-4 gap-4">
            <CategoryIcon type="income" />
            <Text> Nova Receita</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-full flex-row items-center p-4 gap-4">
            <AccountIcon />
            <Text> Nova Conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
