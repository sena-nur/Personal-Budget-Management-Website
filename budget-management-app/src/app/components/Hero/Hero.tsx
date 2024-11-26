"use client";

import { useState } from "react";
import { useBudget } from "@/context/BudgetContext";
import Tab from "../UI/Tab";
import CategoryForm from "./CategoryForm";
import TransactionForm from "../Hero/TransactionForm";
import DateSelector from "../UI/DateSelector";
import { format } from "date-fns";

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const { transactions } = useBudget();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedType, setSelectedType] = useState<"income" | "expense">(
    "income"
  );

  const startOfMonth = new Date(selectedYear, selectedMonth, 1);
  const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0);

  const monthlyTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= startOfMonth && transactionDate <= endOfMonth;
  });

  const monthlyIncome = monthlyTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpense = monthlyTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const formattedDate = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold dark:text-white">Aylık Özet</h2>
        <DateSelector
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
        />
      </div>

      <div className="mt-4 p-6 mb-4 bg-blue-100 dark:bg-blue-900 rounded-lg shadow-lg">
        <div>
          <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
            Aylık Net Durum
          </h4>
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
            ₺{(monthlyIncome - monthlyExpense).toLocaleString("tr-TR")}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Bu, aylık gelir ve giderleriniz arasındaki farktır.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-100">
            Toplam Gelir
          </h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            ₺{monthlyIncome.toLocaleString()}
          </p>
        </div>
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-100">
            Toplam Gider
          </h3>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            ₺{monthlyExpense.toLocaleString()}
          </p>
        </div>
      </div>

      <Tab
        tabs={["Kategori Ekle", "Gelir/Gider Ekle"]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-6">
        {activeTab === 0 ? (
          <CategoryForm />
        ) : (
          <div>
            <div className="mb-4">
              <select
                value={selectedType}
                onChange={(e) =>
                  setSelectedType(e.target.value as "income" | "expense")
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="income">Gelir</option>
                <option value="expense">Gider</option>
              </select>
            </div>
            <TransactionForm
              type={selectedType}
              onClose={() => setActiveTab(0)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
