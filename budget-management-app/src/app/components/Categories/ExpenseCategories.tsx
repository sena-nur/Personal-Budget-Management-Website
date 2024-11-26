"use client";

import { useState } from "react";
import { useBudget } from "@/context/BudgetContext";
import CategoryModal from "./CategoryModal";
import AddCategoryModal from "./AddCategoryModal";
import { Category, Transaction } from "../../../../types";
import DateSelector from "../UI/DateSelector";

export default function ExpenseCategories() {
  const { categories, transactions } = useBudget();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLimit, setEditingLimit] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Gider kategorilerini filtreleme
  const expenseCategories = categories.filter((cat) => cat.type === "expense");

  const categoryTotals = expenseCategories.reduce((acc, category) => {
    const total = transactions
      .filter((t) => t.categoryId === category.id && t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return { ...acc, [category.id]: total };
  }, {} as Record<string, number>);

  const handleLimitUpdate = (categoryId: string, newLimit: number) => {
    setEditingLimit(null);
  };
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold dark:text-white">Giderler</h2>
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 mt-4">
            <DateSelector
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onMonthChange={setSelectedMonth}
              onYearChange={setSelectedYear}
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded-lg 
              hover:bg-red-600 dark:hover:bg-red-700 
              transition-colors h-[40px]"
          >
            Yeni Kategori Ekle
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {expenseCategories.map((category) => (
          <div
            key={category.id}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <span
                className="font-medium cursor-pointer 
                  hover:text-blue-600 dark:hover:text-blue-400 
                  dark:text-white"
                onClick={() => setSelectedCategory(category)}
              >
                {category.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-red-600 dark:text-red-400 font-bold">
                  ₺{categoryTotals[category.id]?.toLocaleString() || "0"}
                </span>
                <span className="text-gray-500 dark:text-gray-400">/</span>
                {editingLimit === category.id ? (
                  <input
                    type="number"
                    className="w-24 p-1 border rounded
                      bg-white dark:bg-gray-600
                      text-gray-900 dark:text-white
                      border-gray-300 dark:border-gray-500
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={category.limit}
                    onBlur={(e) =>
                      handleLimitUpdate(category.id, Number(e.target.value))
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleLimitUpdate(
                          category.id,
                          Number((e.target as HTMLInputElement).value)
                        );
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <span
                    className="cursor-pointer 
                      hover:text-blue-600 dark:hover:text-blue-400
                      dark:text-gray-300"
                    onClick={() => setEditingLimit(category.id)}
                  >
                    ₺{category.limit?.toLocaleString() || "Limit yok"}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  category.limit && categoryTotals[category.id] > category.limit
                    ? "bg-red-600 dark:bg-red-500"
                    : "bg-blue-600 dark:bg-blue-500"
                }`}
                style={{
                  width: category.limit
                    ? `${Math.min(
                        (categoryTotals[category.id] / category.limit) * 100,
                        100
                      )}%`
                    : "0%",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <CategoryModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}

      {showAddModal && (
        <AddCategoryModal
          type="expense"
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
