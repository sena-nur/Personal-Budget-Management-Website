"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Category, Transaction, BudgetContextType } from "../../types";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorage";

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const savedCategories = loadFromLocalStorage("categories");
    const savedTransactions = loadFromLocalStorage("transactions");

    if (savedCategories) setCategories(savedCategories);
    if (savedTransactions) setTransactions(savedTransactions);
  }, []);

  const addCategory = (category: Omit<Category, "id">) => {
    const newCategory = { ...category, id: crypto.randomUUID() };
    setCategories((prev) => {
      const updated = [...prev, newCategory];
      saveToLocalStorage("categories", updated);
      return updated;
    });
  };

  const updateCategory = (updatedCategory: Category) => {
    setCategories((prev) => {
      const updated = prev.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      );
      saveToLocalStorage("categories", updated);
      return updated;
    });
  };

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = { ...transaction, id: crypto.randomUUID() };
    setTransactions((prev) => {
      const updated = [...prev, newTransaction];
      saveToLocalStorage("transactions", updated);
      return updated;
    });
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      saveToLocalStorage("transactions", updated);
      return updated;
    });
  };

  const updateTransaction = (
    id: string,
    transaction: Omit<Transaction, "id">
  ) => {
    setTransactions((prev) => {
      const updated = prev.map((t) =>
        t.id === id ? { ...transaction, id } : t
      );
      saveToLocalStorage("transactions", updated);
      return updated;
    });
  };

  const deleteCategory = (categoryId: string) => {
    setTransactions((prev) => {
      const updated = prev.filter((t) => t.categoryId !== categoryId);
      saveToLocalStorage("transactions", updated);
      return updated;
    });

    setCategories((prev) => {
      const updated = prev.filter((c) => c.id !== categoryId);
      saveToLocalStorage("categories", updated);
      return updated;
    });
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <BudgetContext.Provider
      value={{
        categories,
        transactions,
        addCategory,
        addTransaction,
        deleteTransaction,
        deleteCategory,
        updateTransaction,
        updateCategory,
        totalIncome,
        totalExpense,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
}
