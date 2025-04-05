import { useTransactions } from "@/src/hooks/useTransaction";
import { TransactionsFilterParam } from "@/src/services/transactionService/getAll";
import { useEffect, useState } from "react";

export function useTransactionsController() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionsFilterParam>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const { data, isFetching, isInitialLoading, refetch } =
    useTransactions(filters);

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  function handleChangeFilter<TFilter extends keyof TransactionsFilterParam>(
    filter: TFilter
  ) {
    return (value: TransactionsFilterParam[TFilter]) => {
      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  return {
    isInitialLoading,
    isLoading: isFetching,
    transactions: data,
    isFilterModalOpen,
    handleChangeFilter,
    filters,
  };
}
