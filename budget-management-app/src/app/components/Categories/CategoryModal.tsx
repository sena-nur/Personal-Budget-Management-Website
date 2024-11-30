"use client";

import { useState } from "react";
import { useBudget } from "@/context/BudgetContext";
import { Category, Transaction } from "../../../../types";
import TransactionForm from "../Hero/TransactionForm";

interface CategoryModalProps {
  category: Category;
  selectedMonth: number;
  selectedYear: number;
  onClose: () => void;
}

export default function CategoryModal({
  category,
  selectedMonth,
  selectedYear,
  onClose,
}: CategoryModalProps) {
  const { transactions, deleteTransaction, deleteCategory } = useBudget();
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  // o kategoriye ait işlemleri filtreleme ve tarihe göre sıralama
  const categoryTransactions = transactions
    .filter((t) => {
      const transactionDate = new Date(t.date);
      return (
        t.categoryId === category.id &&
        transactionDate.getMonth() === selectedMonth &&
        transactionDate.getFullYear() === selectedYear
      );
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleDeleteCategory = () => {
    if (
      window.confirm(
        "Bu kategoriyi ve kategoriye ait tüm işlemleri silmek istediğinizden emin misiniz?"
      )
    ) {
      deleteCategory(category.id);
      onClose();
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {showTransactionForm || editingTransaction ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold dark:text-white">
                {editingTransaction ? "İşlemi Düzenle" : "Yeni İşlem Ekle"}
              </h3>
              <button
                onClick={() => {
                  setShowTransactionForm(false);
                  setEditingTransaction(null);
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <TransactionForm
              category={category}
              transaction={editingTransaction}
              type={category.type}
              onClose={() => {
                setShowTransactionForm(false);
                setEditingTransaction(null);
              }}
            />
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold dark:text-white">
                {category.name}
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleDeleteCategory}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Kategoriyi Sil
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowTransactionForm(true)}
              className="mb-6 px-4 py-2 rounded-lg 
                bg-blue-500 hover:bg-blue-600 
                dark:bg-blue-600 dark:hover:bg-blue-700 
                text-white 
                transition-colors"
            >
              Yeni {category.type === "income" ? "Gelir" : "Gider"} Ekle
            </button>

            <div className="space-y-4">
              {categoryTransactions.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                  Bu kategoride henüz işlem bulunmamaktadır.
                </div>
              ) : (
                categoryTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center p-4 
                      bg-gray-50 dark:bg-gray-700 
                      rounded-lg"
                  >
                    <div>
                      <p className="font-medium dark:text-white">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold dark:text-white">
                        ₺{transaction.amount.toLocaleString()}
                      </span>
                      <button
                        onClick={() => setEditingTransaction(transaction)}
                        className="text-blue-500 hover:text-blue-700 
                          dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Bu işlemi silmek istediğinizden emin misiniz?"
                            )
                          ) {
                            deleteTransaction(transaction.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 
                          dark:text-red-400 dark:hover:text-red-300"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
