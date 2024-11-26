"use client";

import { useState } from "react";
import TransactionItem from "./TransactionItem";
import { useBudget } from "@/context/BudgetContext";
import Pagination from "../UI/Pagination";

export default function TransactionList() {
  const { transactions, categories } = useBudget();
  const sortedTransactions = [...transactions].reverse();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const sortedCurrentTransactions = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Son İşlemler</h2>
      {sortedCurrentTransactions.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
          Henüz işlem bulunmamaktadır.
        </div>
      ) : (
        <div className="space-y-4">
          {sortedCurrentTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
