import { useTransactions } from "@/src/hooks/useTransaction";
import { transactionsService } from "@/src/services/transactionService";
import { TransactionsFilterParam } from "@/src/services/transactionService/getAll";
import { dialogEmit } from "@/src/utils/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";

export function useTransactionsController() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending: loadDelete } = useMutation({
    mutationFn: (id: string) => transactionsService.remove(id),
  });

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

  async function deleteItem(id: string) {
    try {
      await mutateAsync(id);

      showMessage({
        message: "Sucesso!",
        description: "Transação excluida com sucesso 👌",
        type: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
    } catch (err) {
      showMessage({
        message: "Falha!",
        description:
          "Ops, ocorreu um erro por aqui, tente novamente mais tarde",
        type: "danger",
      });
    }
  }

  function handleOpenDialog(id: string) {
    dialogEmit({
      event: "showDialog",
      payload: {
        id,
        onConfirm: () => {
          deleteItem(id);
        },
      },
    });
  }

  return {
    isInitialLoading,
    isLoading: isFetching,
    transactions: data,
    isFilterModalOpen,
    handleChangeFilter,
    filters,
    handleOpenDialog,
    loadDelete,
  };
}
