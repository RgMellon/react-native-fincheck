export interface Transaction {
  id: string;
  name: string;
  value: string;
  date: string;
  bankAccountId: string;
  categoryId: string;
  type?: "INCOME" | "EXPENSIVE";
  category?: {
    id: string;
    icon: string;
    name: string;
  };
}
