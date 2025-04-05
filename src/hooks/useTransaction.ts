import { useQuery } from "@tanstack/react-query";
import { TransactionsFilterParam } from "../services/transactionService/getAll";
import { transactionsService } from "../services/transactionService";

export function useTransactions(filter: TransactionsFilterParam) {
  const {
    data = [],
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactionsService.getAll(filter),
  });

  return {
    isFetching,
    data,
    isInitialLoading: isLoading,
    refetch,
  };
}
