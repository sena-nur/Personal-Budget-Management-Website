"use client";

import { Suspense } from "react";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero/Hero";
import TransactionList from "@/app/components/Transactions/TransactionList";
import MonthlyChart from "@/app/components/Charts/MonthlyExpenseChart";
import MonthlyIncomeChart from "@/app/components/Charts/MonthlyIncomeChart";
import YearlyChart from "@/app/components/Charts/YearlyChart";
import { BudgetProvider } from "@/context/BudgetContext";

export default function Home() {
  return (
    <BudgetProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar />
        <main className="container mx-auto py-8 px-4">
          <Suspense
            fallback={
              <div className="text-gray-600 dark:text-gray-400">Loading...</div>
            }
          >
            <Hero />
          </Suspense>

          <div className="mt-8">
            <Suspense
              fallback={
                <div className="text-gray-600 dark:text-gray-400">
                  Loading transactions...
                </div>
              }
            >
              <TransactionList />
            </Suspense>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Suspense
              fallback={
                <div className="text-gray-600 dark:text-gray-400">
                  Loading monthly expense chart...
                </div>
              }
            >
              <MonthlyChart />
            </Suspense>
            <Suspense
              fallback={
                <div className="text-gray-600 dark:text-gray-400">
                  Loading monthly income chart...
                </div>
              }
            >
              <MonthlyIncomeChart />
            </Suspense>
          </div>

          <div className="mt-8 max-w-4xl mx-auto">
            <Suspense
              fallback={
                <div className="text-gray-600 dark:text-gray-400">
                  Loading yearly chart...
                </div>
              }
            >
              <YearlyChart />
            </Suspense>
          </div>
        </main>
      </div>
    </BudgetProvider>
  );
}
