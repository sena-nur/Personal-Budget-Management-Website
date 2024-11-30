"use client";
import { useState } from "react";
import Link from "next/link";
import {
  BsFileEarmarkText,
  BsSun,
  BsMoon,
  BsLightbulb,
  BsList,
  BsX,
  BsGrid,
} from "react-icons/bs";
import { useTheme } from "@/context/ThemeCotext";
import { useEffect } from "react";
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Body scroll lock
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const menuItemClass =
    "w-full text-center py-3 px-4 hover:bg-blue-700/50 dark:hover:bg-blue-800/50 transition-colors flex items-center justify-center gap-2 rounded-lg";

  return (
    <nav className="bg-blue-600 dark:bg-blue-900 text-white p-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-bold hover:opacity-90 transition-opacity"
        >
          <div className="rounded-lg p-2">
            <img
              src="/my_logo.svg"
              alt="Kişisel Bütçe Takibi Logo"
              className="h-8 w-8 dark:invert brightness-0 "
            />
          </div>
          <span>Kişisel Bütçe Takibi</span>
        </Link>

        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <BsX size={24} /> : <BsList size={24} />}
        </button>

        {/* Desktop Menü */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/categories"
            className="bg-white dark:bg-gray-800 text-blue-600 dark:text-white px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <BsGrid />
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
            className="bg-white dark:bg-gray-800 text-blue-600 dark:text-white p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <BsMoon size={20} /> : <BsSun size={20} />}
          </button>
        </div>

        {/* Mobil Menü */}
        <div
          className={`${
            isMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          } lg:hidden fixed inset-0 top-16 bg-blue-600/95 dark:bg-blue-900/95 backdrop-blur-sm
          transition-all duration-300 ease-in-out flex flex-col p-4 gap-3`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="bg-white/10 dark:bg-black/10 rounded-xl p-4 flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href="/categories"
              className={menuItemClass}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="bg-blue-500/20 p-2 rounded-lg">
                <BsGrid size={20} />
              </span>
              <span className="flex-1 text-left ml-3">Kategorileri Yönet</span>
            </Link>

            <Link
              href="/reports"
              className={menuItemClass}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="bg-blue-500/20 p-2 rounded-lg">
                <BsFileEarmarkText size={20} />
              </span>
              <span className="flex-1 text-left ml-3">Raporlarım</span>
            </Link>

            <Link
              href="/advices"
              className={menuItemClass}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="bg-blue-500/20 p-2 rounded-lg">
                <BsLightbulb size={20} />
              </span>
              <span className="flex-1 text-left ml-3">Öneriler</span>
            </Link>

            <button
              onClick={() => {
                toggleTheme();
                setIsMenuOpen(false);
              }}
              className={menuItemClass}
              aria-label="Toggle theme"
            >
              <span className="bg-blue-500/20 p-2 rounded-lg">
                {theme === "light" ? <BsMoon size={20} /> : <BsSun size={20} />}
              </span>
              <span className="flex-1 text-left ml-3">
                {theme === "light" ? "Koyu Tema" : "Açık Tema"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
