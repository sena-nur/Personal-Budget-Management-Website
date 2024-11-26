"use client";

import { useState } from "react";
import { useBudget } from "@/context/BudgetContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import DateSelector from "../UI/DateSelector";
import { Transaction } from "../../../../types";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MonthlyExpenseChart() {
  const { transactions, categories } = useBudget();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const startOfMonth = new Date(selectedYear, selectedMonth, 1);
  const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0);

  const currentMonthExpenses = transactions.filter(
    (transaction: Transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transaction.type === "expense" &&
        transactionDate >= startOfMonth &&
        transactionDate <= endOfMonth
      );
    }
  );

  const expensesByCategory = currentMonthExpenses.reduce(
    (acc: { [key: string]: number }, transaction: Transaction) => {
      const category = categories.find((c) => c.id === transaction.categoryId);
      if (category) {
        const categoryName = category.name;
        acc[categoryName] = (acc[categoryName] || 0) + transaction.amount;
      }
      return acc;
    },
    {}
  );

  const filteredCategories = Object.entries(expensesByCategory)
    .filter(([_, amount]) => amount > 0)
    .sort((a, b) => b[1] - a[1]);

  const totalExpenses = filteredCategories.reduce(
    (sum, [_, amount]) => sum + amount,
    0
  );

  const data = {
    labels: filteredCategories.map(([name]) => name),
    datasets: [
      {
        data: filteredCategories.map(([_, amount]) => amount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF99CC",
          "#99CCFF",
          "#99FF99",
          "#FFB366",
        ],
        borderColor: "rgba(255, 255, 255, 0.8)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "currentColor", // Dark mode uyumlu metin rengi
          generateLabels: function (chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, index: number) => {
                const value = data.datasets[0].data[index];
                const percentage = ((value / totalExpenses) * 100).toFixed(1);
                return {
                  text: `${label}: ₺${value.toLocaleString()} (%${percentage})`,
                  fillStyle: data.datasets[0].backgroundColor[index],
                  hidden: false,
                  index: index,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.raw;
            const percentage = ((value / totalExpenses) * 100).toFixed(1);
            return `₺${value.toLocaleString()} (%${percentage})`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
      },
      title: {
        display: true,
        text: `${format(startOfMonth, "MMMM yyyy", {
          locale: tr,
        })} Aylık Gider Dağılımı`,
        color: "currentColor",
        font: { size: 16 },
      },
    },
  };

  if (currentMonthExpenses.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Aylık Gider Analizi
        </h2>
        <DateSelector
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
        />
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          Bu ay için henüz gider kaydı bulunmamaktadır.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg h-full">
      <h2 className="text-xl font-bold mb-4 dark:text-white">
        Aylık Gider Analizi
      </h2>
      <DateSelector
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
      />
      <div className="w-full h-[300px] sm:h-[400px] mt-4">
        {" "}
        <Pie data={data} options={options} />
      </div>
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        Toplam Gider: ₺{totalExpenses.toLocaleString()}
      </div>
    </div>
  );
}
