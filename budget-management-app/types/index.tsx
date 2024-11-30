export interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
  limit?: number;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  categoryId: string;
  type: "income" | "expense";
  date: string;
}

export interface BudgetContextType {
  categories: Category[];
  transactions: Transaction[];
  addCategory: (category: Omit<Category, "id">) => void;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  deleteCategory: (id: string) => void;
  updateCategory: (updatedCategory: Category) => void;
  updateTransaction: (id: string, transaction: Omit<Transaction, "id">) => void;
  totalIncome: number;
  totalExpense: number;
}
