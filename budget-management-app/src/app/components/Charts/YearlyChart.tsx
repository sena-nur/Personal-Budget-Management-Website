"use client";

import { useBudget } from "@/context/BudgetContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function YearlyChart() {
  const { transactions } = useBudget();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const monthlyData = months.map((_, index) => {
    const monthTransactions = transactions.filter((t: any) => {
      const transactionDate = new Date(t.date);
      return (
        transactionDate.getMonth() === index &&
        transactionDate.getFullYear() === selectedYear
      );
    });

    return {
      income: monthTransactions
        .filter((t: any) => t.type === "income")
        .reduce((sum: any, t: any) => sum + t.amount, 0),
      expense: monthTransactions
        .filter((t: any) => t.type === "expense")
        .reduce((sum: any, t: any) => sum + t.amount, 0),
    };
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: "Gelir",
        data: monthlyData.map((d) => d.income),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
      {
        label: "Gider",
        data: monthlyData.map((d) => d.expense),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "currentColor",
        },
      },
      title: {
        display: true,
        text: `${selectedYear} Yılı Gelir/Gider Analizi`,
        color: "currentColor",
        font: { size: 16 },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            const value = context.raw;
            return `${context.dataset.label}: ₺${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "currentColor",
          callback: function (value: any) {
            return `₺${value.toLocaleString()}`;
          },
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "currentColor",
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Yıllık Analiz</h2>
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        className="p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 
          bg-white dark:bg-gray-700 
          text-gray-900 dark:text-white 
          border-gray-300 dark:border-gray-600 
          hover:border-blue-500 dark:hover:border-blue-400
          transition-colors"
      >
        {years.map((year) => (
          <option
            key={year}
            value={year}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {year}
          </option>
        ))}
      </select>
      <Bar data={data} options={options} />
    </div>
  );
}
