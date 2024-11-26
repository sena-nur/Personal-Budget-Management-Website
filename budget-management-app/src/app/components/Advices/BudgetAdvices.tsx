"use client";

import { useBudget } from "@/context/BudgetContext";
import { useState } from "react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import DateSelector from "../UI/DateSelector";

export default function BudgetAdvices() {
  const { transactions, categories } = useBudget();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const monthlyTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getMonth() === selectedMonth &&
      transactionDate.getFullYear() === selectedYear
    );
  });

  const expensesByCategory = monthlyTransactions.reduce((acc, transaction) => {
    if (transaction.type === "expense") {
      const category = categories.find((c) => c.id === transaction.categoryId);
      if (category) {
        acc[category.name] = (acc[category.name] || 0) + transaction.amount;
      }
    }
    return acc;
  }, {} as Record<string, number>);

  const topExpenses = Object.entries(expensesByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const totalIncome = monthlyTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = monthlyTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const generateAdvices = () => {
    const advices = [];
    const savingsRate = ((totalIncome - totalExpense) / totalIncome) * 100;

    // Genel tasarruf durumu
    if (savingsRate < 20) {
      advices.push({
        type: "warning",
        text: "Aylık gelirinizin %20'sini tasarruf etmeyi hedefleyin. Şu anda tasarruf oranınız düşük.",
      });
    }

    topExpenses.forEach(([category, amount]) => {
      const percentageOfIncome = (amount / totalIncome) * 100;
      if (percentageOfIncome > 20) {
        advices.push({
          type: "warning",
          text: `${category} harcamalarınız gelirinizin %${percentageOfIncome.toFixed(
            1
          )}'ini oluşturuyor. Bu kategoriyi gözden geçirmenizi öneririz.`,
        });
      }
    });

    categories
      .filter((c) => c.type === "expense" && c.limit)
      .forEach((category) => {
        const spent = expensesByCategory[category.name] || 0;
        if (spent > category.limit!) {
          advices.push({
            type: "error",
            text: `${
              category.name
            } kategorisinde bütçe limitinizi aştınız. Bu kategorideki harcamanıza dikkat etmelisiniz. Limit: ₺${category.limit?.toLocaleString(
              "tr-TR"
            )}, Harcama: ₺${spent.toLocaleString("tr-TR")}`,
          });
        }
      });

    return advices;
  };

  const advices = generateAdvices();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold dark:text-white">
          Tasarruf Önerileri
        </h2>
        <DateSelector
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 dark:text-white">
          {format(new Date(selectedYear, selectedMonth), "MMMM yyyy", {
            locale: tr,
          })}{" "}
          Özeti
        </h3>

        <div className="mt-4 p-6 bg-blue-100 dark:bg-blue-900 rounded-lg shadow-lg">
          <div>
            <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
              Aylık Net Durum
            </h4>
            <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
              ₺{(totalIncome - totalExpense).toLocaleString("tr-TR")}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Bu, aylık gelir ve giderleriniz arasındaki farktır.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              Toplam Gelir
            </p>
            <p className="text-xl font-bold text-green-800 dark:text-green-200">
              ₺{totalIncome.toLocaleString("tr-TR")}
            </p>
          </div>
          <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-200">
              Toplam Gider
            </p>
            <p className="text-xl font-bold text-red-800 dark:text-red-200">
              ₺{totalExpense.toLocaleString("tr-TR")}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold dark:text-white">
          En Yüksek Harcama Kategorileri
        </h3>
        {topExpenses.map(([category, amount]) => (
          <div
            key={category}
            className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <span className="text-gray-700 dark:text-gray-200">{category}</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              ₺{amount.toLocaleString("tr-TR")}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Öneriler</h3>
        {advices.length > 0 ? (
          <div className="space-y-3">
            {advices.map((advice, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  advice.type === "warning"
                    ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                    : advice.type === "error"
                    ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                    : advice.type === "success"
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                    : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                }`}
              >
                <div className="whitespace-pre-line">{advice.text}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            Harika! Bütçenizi iyi yönetiyorsunuz. Böyle devam edin!
          </p>
        )}
      </div>
    </div>
  );
}
