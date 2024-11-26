"use client";

import BudgetAdvices from "../components/Advices/BudgetAdvices";
import Navbar from "../components/Navbar";

export default function AdvicesPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <BudgetAdvices />
      </div>
    </div>
  );
}
