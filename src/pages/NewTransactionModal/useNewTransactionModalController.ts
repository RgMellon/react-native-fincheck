import { useCategories } from "@/src/hooks/useCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDashboard } from "../Dashboard/useDashboard";

export function useNewTransactionModalController() {
  const { categories: categorisList, fetchingCategories } = useCategories();

  const { newTransactionType } = useDashboard();

  const categories = useMemo(() => {
    console.log(newTransactionType, categorisList);
    return categorisList.filter(
      (category) => category.type === newTransactionType
    );
  }, [categorisList, newTransactionType]);

  const schema = z.object({
    // name: z.string().nonempty("Nome obrigatório"),
    value: z.union([
      z.string().nonempty("Saldo inicial é obrigatório"),
      z
        .number()
        .nonnegative("Valor deve ser positivo")
        .gt(0, "Valor deve ser maior que 0"),
    ]),
    // date: z.date(),
    categoryId: z.string().nonempty("Informe a categoria"),
    // bankAccountId: z.string().nonempty("Informe o tipo de conta"),
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

  const handleSubmit = hookFormSubmit(async (data) => {
    alert("oi");
    console.log(data);
    // const { bankAccountId, categoryId, date, name, value } = data;
    try {
      //   await mutateAsync({
      //     bankAccountId,
      //     categoryId,
      //     date: date.toISOString(),
      //     name,
      //     type: newTransactionType!,
      //     value: currencyStringToNumber(value),
      //   });
      //   queryClient.invalidateQueries({ queryKey: ["transactions"] });
      //   toast.success("Cadastrado com sucesso!  ✍🏻");
      //   closeNewTransactionModal();
      //   reset();
    } catch (err) {
      //   console.log(err);
      //   toast.error("Erro ao criar conta, tente novamente mais tarde");
    }
  });

  return {
    control,
    errors,
    register,
    handleSubmit,
    categories,
    fetchingCategories,
  };
}
