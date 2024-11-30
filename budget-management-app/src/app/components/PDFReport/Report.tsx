"use client";

import { usePDF } from "react-to-pdf";
import { BudgetProvider } from "@/context/BudgetContext";
import { useBudget } from "@/context/BudgetContext";
import Navbar from "../Navbar";
import { useState } from "react";
import DateSelector from "../UI/DateSelector";
import { tr } from "date-fns/locale";
import { format } from "date-fns";

const Report = () => {
  const { toPDF, targetRef } = usePDF({ filename: "butce-raporu.pdf" });
  const { transactions, categories } = useBudget();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getMonth() === selectedMonth &&
      transactionDate.getFullYear() === selectedYear
    );
  });

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <BudgetProvider>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Navbar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Raporlar
          </h1>
          <div className="flex justify-between items-center">
            <DateSelector
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onMonthChange={setSelectedMonth}
              onYearChange={setSelectedYear}
            />
            <button
              onClick={() => toPDF()}
              className="bg-blue-500 text-white px-4 py-2 h-10 mb-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              PDF İndir
            </button>
          </div>

          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            ref={targetRef}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              {format(new Date(selectedYear, selectedMonth), "MMMM", {
                locale: tr,
              })}{" "}
              {selectedYear} Bütçe Raporu
            </h2>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                Gelirler
              </h3>
              {filteredTransactions
                .filter((t) => t.type === "income")
                .map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between py-2 border-b border-gray-300 dark:border-gray-600"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {
                        categories.find((c) => c.id === transaction.categoryId)
                          ?.name
                      }
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      ₺{transaction.amount.toLocaleString("tr-TR")}
                    </span>
                  </div>
                ))}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                Giderler
              </h3>
              {filteredTransactions
                .filter((t) => t.type === "expense")
                .map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between py-2 border-b border-gray-300 dark:border-gray-600"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {
                        categories.find((c) => c.id === transaction.categoryId)
                          ?.name
                      }
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      ₺{transaction.amount.toLocaleString("tr-TR")}
                    </span>
                  </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-600">
              <div className="font-bold text-gray-800 dark:text-white">
                <div className="flex justify-between mb-2">
                  <span>Toplam Gelir:</span>
                  <span>₺{totalIncome.toLocaleString("tr-TR")}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Toplam Gider:</span>
                  <span>₺{totalExpense.toLocaleString("tr-TR")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Net Durum:</span>
                  <span>
                    ₺{(totalIncome - totalExpense).toLocaleString("tr-TR")}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6"></div>
          </div>
        </div>
      </div>
    </BudgetProvider>
  );
};

export default Report;
