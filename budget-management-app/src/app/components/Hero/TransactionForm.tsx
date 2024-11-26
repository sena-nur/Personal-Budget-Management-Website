"use client";

import { useState, useEffect } from "react";
import { useBudget } from "@/context/BudgetContext";
import { Category, Transaction } from "../../../../types";
import Alert from "../UI/Alert";

interface TransactionFormProps {
  category?: Category | null;
  transaction?: Transaction | null;
  onClose: () => void;
  type: "income" | "expense";
  hideCategory?: boolean;
}

export default function TransactionForm({
  category: initialCategory,
  transaction,
  type,
  hideCategory = false,
}: TransactionFormProps) {
  const { addTransaction, updateTransaction, categories, transactions } =
    useBudget();
  const [description, setDescription] = useState(
    transaction?.description || ""
  );
  const [amount, setAmount] = useState(transaction?.amount?.toString() || "");
  const [date, setDate] = useState(
    transaction?.date || new Date().toISOString().split("T")[0]
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    initialCategory?.id || transaction?.categoryId || ""
  );
  const [alert, setAlert] = useState<{
    show: boolean;
    type: "warning" | "error" | "success";
    message: string;
  }>({ show: false, type: "warning", message: "" });
  const [showSuccess, setShowSuccess] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

  const availableCategories = categories.filter(
    (c) => c.type === (initialCategory?.type || type)
  );

  useEffect(() => {
    if (type === "expense" && selectedCategoryId && amount) {
      const selectedCategory = categories.find(
        (c) => c.id === selectedCategoryId
      );
      if (!selectedCategory?.limit) return;

      const currentExpenses = transactions
        .filter(
          (t) => t.categoryId === selectedCategoryId && t.type === "expense"
        )
        .reduce((sum, t) => sum + t.amount, 0);

      const existingAmount =
        transaction?.categoryId === selectedCategoryId ? transaction.amount : 0;
      const newTotal = currentExpenses - existingAmount + Number(amount);
      const percentage = (newTotal / selectedCategory.limit) * 100;

      if (percentage > 100) {
        setAlert({
          show: true,
          type: "error",
          message: `Limit aşımı! Toplam: ₺${newTotal.toLocaleString()} / Limit: ₺${selectedCategory.limit.toLocaleString()}`,
        });
      } else if (percentage >= 80) {
        setAlert({
          show: true,
          type: "warning",
          message: `Dikkat! Limitin %${percentage.toFixed(0)}'ine ulaştınız.`,
        });
      } else {
        setAlert({ show: false, type: "warning", message: "" });
      }
    }
  }, [amount, selectedCategoryId, categories, transactions, type, transaction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim() || !amount || !date || !selectedCategoryId) {
      return;
    }

    const transactionData = {
      description: description.trim(),
      amount: Number(amount),
      date,
      categoryId: selectedCategoryId,
      type: initialCategory?.type || type,
    };

    try {
      if (transaction) {
        await updateTransaction(transaction.id, transactionData);
        setShowSuccess({
          show: true,
          message: `${
            type === "income" ? "Gelir" : "Gider"
          } başarıyla güncellendi!`,
        });
      } else {
        await addTransaction(transactionData);
        setShowSuccess({
          show: true,
          message: `${
            type === "income" ? "Gelir" : "Gider"
          } başarıyla eklendi!`,
        });
      }

      setDescription("");
      setAmount("");
      setDate(new Date().toISOString().split("T")[0]);
      setSelectedCategoryId("");
    } catch (error) {
      setAlert({
        show: true,
        type: "error",
        message: "İşlem kaydedilirken bir hata oluştu!",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {alert.show && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      {showSuccess.show && (
        <Alert type="success" message={showSuccess.message} />
      )}

      {!hideCategory && (
        <div>
          <label className="block mb-2 dark:text-white">Kategori</label>
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="">Kategori Seçin</option>
            {availableCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block mb-2 dark:text-white">Açıklama</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          placeholder="Açıklama girin"
          required
        />
      </div>

      <div>
        <label className="block mb-2 dark:text-white">Tutar</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          required
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label className="block mb-2 dark:text-white">Tarih</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <button
        type="submit"
        disabled={!selectedCategoryId || !description || !amount || !date}
        className={`w-full p-2 text-white rounded transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 ${
          type === "income"
            ? "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
            : "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
        }`}
      >
        {transaction ? "Güncelle" : "Ekle"}
      </button>
    </form>
  );
}
