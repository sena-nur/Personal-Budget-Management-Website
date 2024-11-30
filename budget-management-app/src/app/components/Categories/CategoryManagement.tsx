"use client";

import IncomeCategories from "./IncomeCategories";
import ExpenseCategories from "./ExpenseCategories";

export default function CategoryManagement() {
  return (
    <div className="container mx-auto p-4 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
      <IncomeCategories />
      <ExpenseCategories />
    </div>
  );
}
