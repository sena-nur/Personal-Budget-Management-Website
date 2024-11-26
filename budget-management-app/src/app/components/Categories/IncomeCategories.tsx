"use client";

import { useState } from "react";
import { useBudget } from "@/context/BudgetContext";
import CategoryModal from "./CategoryModal";
import AddCategoryModal from "./AddCategoryModal";
import { Category, Transaction } from "../../../../types";
import DateSelector from "../UI/DateSelector";

export default function IncomeCategories() {
  const { categories, transactions } = useBudget();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Gelir kategorilerini filtreleme
  const incomeCategories = categories.filter((cat) => cat.type === "income");

  const categoryTotals = incomeCategories.reduce((acc, category) => {
    const total = transactions
      .filter((t) => t.categoryId === category.id && t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    return { ...acc, [category.id]: total };
  }, {} as Record<string, number>);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold dark:text-white">Gelirler</h2>
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
            className="bg-green-500 dark:bg-green-600 
              hover:bg-green-600 dark:hover:bg-green-700 
              text-white px-4 py-2 rounded-lg 
              transition-colors h-[40px]"
          >
            Yeni Kategori Ekle
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {incomeCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(category)}
            className="flex justify-between items-center p-4 
              bg-gray-50 dark:bg-gray-700 
              hover:bg-gray-100 dark:hover:bg-gray-600 
              rounded-lg cursor-pointer 
              transition-colors"
          >
            <span className="font-medium dark:text-white">{category.name}</span>
            <span className="text-green-600 dark:text-green-400 font-bold">
              ₺{categoryTotals[category.id]?.toLocaleString() || "0"}
            </span>
          </div>
        ))}

        {incomeCategories.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            Henüz gelir kategorisi bulunmamaktadır.
          </div>
        )}
      </div>

      {selectedCategory && (
        <CategoryModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}

      {showAddModal && (
        <AddCategoryModal
          type="income"
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
