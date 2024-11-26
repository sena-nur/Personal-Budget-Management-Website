"use client";

import IncomeCategories from "./IncomeCategories";
import ExpenseCategories from "./ExpenseCategories";

export default function CategoryManagement() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <IncomeCategories />
      <ExpenseCategories />
    </div>
  );
}
