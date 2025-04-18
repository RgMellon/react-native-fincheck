import { useCategories } from "@/src/hooks/useCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDashboard } from "../Dashboard/useDashboard";
import { useBankAccounts } from "@/src/hooks/useBankAccount";
import { parse, isValid } from "date-fns";
import { formateDateBeforeSend } from "@/src/utils/formatDateBeforeSend";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "@/src/services/transactionService";
import { currencyStringToNumber } from "@/src/utils/currencyStringToNumber";
import { TransactionsParam } from "@/src/services/transactionService/create";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

export function useNewTransactionModalController() {
  const { goBack } = useNavigation();
  const queryClient = useQueryClient();
  const { categories: categorisList, fetchingCategories } = useCategories();
  const { accounts, isFetching: fetchingBankAccounts } = useBankAccounts();
  const { newTransactionType } = useDashboard();

  const categories = useMemo(() => {
    console.log(newTransactionType, categorisList);
    return categorisList.filter(
      (category) => category.type === newTransactionType
    );
  }, [categorisList, newTransactionType]);

  const schema = z.object({
    name: z.string().nonempty("Nome obrigatório"),

    value: z.union([
      z.string().nonempty("Saldo inicial é obrigatório"),
      z
        .number()
        .nonnegative("Valor deve ser positivo")
        .gt(0, "Valor deve ser maior que 0"),
    ]),
    date: z.string().refine(
      (val) => {
        const parsed = parse(val, "dd/MM/yyyy", new Date());
        return isValid(parsed);
      },
      {
        message: "Data inválida. Use o formato dd/MM/yyyy",
      }
    ),

    categoryId: z.string().nonempty("Informe a categoria"),
    bankAccountId: z.string().nonempty("Informe o tipo de conta"),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    formState: { errors },
    control,
    handleSubmit: hookFormSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (params: TransactionsParam) =>
      transactionsService.create(params),
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    const { bankAccountId, categoryId, date, name, value } = data;
    const parsedDate = formateDateBeforeSend(date);

    const payload = {
      bankAccountId,
      categoryId,
      date: parsedDate,
      name,
      type: newTransactionType!,
      value: currencyStringToNumber(value),
    };

    try {
      await mutateAsync(payload);

      queryClient.invalidateQueries({ queryKey: ["transactions"] });

      showMessage({
        message: "Sucesso!",
        description: "Transação adicionada 👌",
        type: "success",
      });
      goBack();
    } catch (err) {
      showMessage({
        message: "Erro",
        description: "Tente novamente mais tarde",
        type: "danger",
      });
    }
  });

  return {
    control,
    errors,
    register,
    handleSubmit,
    categories,
    fetchingCategories,
    fetchingBankAccounts,
    accounts,
    isPending,
  };
}
