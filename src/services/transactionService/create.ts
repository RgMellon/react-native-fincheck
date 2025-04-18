import { httpClient } from "../httpClient";

export type TransactionsParam = {
  bankAccountId: string;
  categoryId: string;
  type: "INCOME" | "EXPENSE";
  date: string;
  name: string;
  value: number;
};

export async function create(params: TransactionsParam) {
  const { data } = await httpClient.post("/transactions", params);
  return data;
}
