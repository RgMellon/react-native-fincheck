import { createContext, useCallback, useState } from "react";

interface DashBoardContextValue {
  areValueVisibility: boolean;
  toggleValueVisibility(): void;

  openMenu(): void;
  closeMenu(): void;
  isMenuOpen: boolean;

  //   isNewAccountModalOpen: boolean;
  //   closeNewAccountModal(): void;
  //   openNewAccountModal(): void;
  //   isNewTransactionModalOpen: boolean;
  //   closeNewTransactionModal(): void;
  openNewTransactionModal(type: "INCOME" | "EXPENSE"): void;
  newTransactionType: "INCOME" | "EXPENSE" | null;

  //   openEditModalBankAccount(bankAccount: BankAccount): void;
  //   isEditModalBankAccountOpen: boolean;
  //   closeEditModalBankAccount(): void;
  //   accountBeingEdited: null | BankAccount;
}
export const DashboardContext = createContext({} as DashBoardContextValue);

export function DashBoardProvider({ children }: { children: React.ReactNode }) {
  const [areValueVisibility, setAreValueVisibility] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState<
    "INCOME" | "EXPENSE" | null
  >(null);

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  function toggleValueVisibility() {
    setAreValueVisibility((prevState) => !prevState);
  }

  const openNewTransactionModal = useCallback((type: "INCOME" | "EXPENSE") => {
    setNewTransactionType(type);
    // setIsNewTransactionModalOpen(true);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValueVisibility,
        openMenu,
        closeMenu,
        toggleValueVisibility,
        isMenuOpen,
        openNewTransactionModal,
        newTransactionType,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
