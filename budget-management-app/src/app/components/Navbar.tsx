"use client";
import Link from "next/link";
import { BsFileEarmarkText, BsSun, BsMoon, BsLightbulb } from "react-icons/bs";
import { useTheme } from "@/context/ThemeCotext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-blue-600 dark:bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Kişisel Bütçe Takibi
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/categories"
            className="bg-white dark:bg-gray-800 text-blue-600 dark:text-white px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
          >
            Kategorileri Yönet
          </Link>
          <Link
            href="/reports"
            className="bg-white dark:bg-gray-800 text-blue-600 dark:text-white px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <BsFileEarmarkText />
            Raporlarım
          </Link>
          <Link
            href="/advices"
            className="bg-white dark:bg-gray-800 text-blue-600 dark:text-white px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <BsLightbulb />
            Öneriler
          </Link>
          <button
            onClick={toggleTheme}
            className="bg-white dark:bg-gray-800 text-blue-600 dark:text-white p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <BsMoon size={20} /> : <BsSun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
