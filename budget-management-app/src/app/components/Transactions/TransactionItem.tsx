"use client";

import { useState } from "react";
import { useBudget } from "@/context/BudgetContext";
import { Transaction } from "../../../../types";
import TransactionForm from "../Hero/TransactionForm";

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const { categories, deleteTransaction } = useBudget();
  const [showEditForm, setShowEditForm] = useState(false);

  const category = categories.find((c) => c.id === transaction.categoryId);

  const handleDelete = () => {
    if (window.confirm("Bu işlemi silmek istediğinizden emin misiniz?")) {
      deleteTransaction(transaction.id);
    }
  };

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-medium px-2 py-1 rounded ${
                transaction.type === "income"
                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                  : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
              }`}
            >
              {category?.name || "Silinmiş Kategori"}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {transaction.date}
            </span>
          </div>
          <p className="font-medium mt-1 dark:text-white">
            {transaction.description}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span
            className={`font-bold ${
              transaction.type === "income"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {transaction.type === "income" ? "+" : "-"}₺
            {transaction.amount.toLocaleString()}
          </span>
          <button
            onClick={toggleEditForm}
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            {showEditForm ? "İptal" : "Düzenle"}
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            Sil
          </button>
        </div>
      </div>

      {showEditForm && (
        <TransactionForm
          type={transaction.type}
          transaction={transaction}
          onClose={toggleEditForm}
        />
      )}
    </>
  );
}
