"use client";

import { useState } from "react";
import { useBudget } from "@/context/BudgetContext";
import Alert from "../UI/Alert";

interface AddCategoryModalProps {
  type: "income" | "expense";
  onClose: () => void;
}

export default function AddCategoryModal({
  type,
  onClose,
}: AddCategoryModalProps) {
  const { addCategory, categories } = useBudget();
  const [name, setName] = useState("");
  const [limit, setLimit] = useState("");
  const [alert, setAlert] = useState<{
    show: boolean;
    type: "error" | "success";
    message: string;
  }>({ show: false, type: "error", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setAlert({
        show: true,
        type: "error",
        message: "Kategori adı boş olamaz!",
      });
      return;
    }

    if (type === "expense" && (!limit || Number(limit) <= 0)) {
      setAlert({
        show: true,
        type: "error",
        message: "Geçerli bir limit giriniz!",
      });
      return;
    }

    // Aynı isimde kategori olmamalıdır
    const existingCategory = categories.find(
      (c) =>
        c.name.toLowerCase() === name.trim().toLowerCase() && c.type === type
    );

    if (existingCategory) {
      setAlert({
        show: true,
        type: "error",
        message: `Bu ${
          type === "income" ? "gelir" : "gider"
        } kategorisi zaten mevcut!`,
      });
      return;
    }

    try {
      addCategory({
        name: name.trim(),
        type,
        ...(type === "expense" && { limit: Number(limit) }),
      });
      onClose();
    } catch (error) {
      setAlert({
        show: true,
        type: "error",
        message: "Kategori eklenirken bir hata oluştu!",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold dark:text-white">
            Yeni {type === "income" ? "Gelir" : "Gider"} Kategorisi
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {alert.show && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ ...alert, show: false })}
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 dark:text-white">Kategori Adı</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded 
                focus:outline-none focus:ring-2 focus:ring-blue-500
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-white 
                border-gray-300 dark:border-gray-600
                placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Kategori adı giriniz"
              required
            />
          </div>

          {type === "expense" && (
            <div>
              <label className="block mb-2 dark:text-white">Limit</label>
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="w-full p-2 border rounded 
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-white 
                  border-gray-300 dark:border-gray-600
                  placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 p-2 text-gray-600 dark:text-gray-300 
                border border-gray-300 dark:border-gray-600 
                rounded 
                hover:bg-gray-50 dark:hover:bg-gray-700 
                transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={!name.trim() || (type === "expense" && !limit)}
              className={`w-1/2 p-2 text-white rounded transition-colors
                ${
                  type === "income"
                    ? "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                    : "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                } 
                disabled:bg-gray-400 dark:disabled:bg-gray-600 
                disabled:cursor-not-allowed`}
            >
              Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
