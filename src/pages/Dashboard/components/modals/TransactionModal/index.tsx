import { TransactionModalContent } from "@/src/pages/Dashboard/components/modals/TransactionModal/TransactionModalContent";
import { Modal } from "react-native";
import { useDashboard } from "../../../useDashboard";

export function TransactionModal() {
  const { isNewTransactionModalOpen, closeNewTransactionModal } =
    useDashboard();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isNewTransactionModalOpen}
    >
      <TransactionModalContent />
    </Modal>
  );
}
