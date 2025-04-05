import { useBankAccounts } from "@/src/hooks/useBankAccount";
import { useMemo } from "react";

export function useAccountController() {
  const { accounts, isFetching } = useBankAccounts();

  const currentBalance = useMemo(() => {
    return accounts.reduce(
      (total, account) => total + account.currentBalance,
      0
    );
  }, [accounts]);

  return {
    isLoading: isFetching,
    accounts,
    currentBalance,
  };
}
