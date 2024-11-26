import { Suspense } from "react";
import Navbar from "@/app/components/Navbar";
import CategoryManagement from "@/app/components/Categories/CategoryManagement";
import { BudgetProvider } from "@/context/BudgetContext";

export default function CategoriesPage() {
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
            <CategoryManagement />
          </Suspense>
        </main>
      </div>
    </BudgetProvider>
  );
}
