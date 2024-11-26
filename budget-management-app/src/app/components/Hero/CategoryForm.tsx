import { useState } from "react";
import { useBudget } from "@/context/BudgetContext";
import Alert from "../UI/Alert";

export default function CategoryForm() {
  const { addCategory, categories } = useBudget();
  const [type, setType] = useState<"income" | "expense">("income");
  const [name, setName] = useState("");
  const [limit, setLimit] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const categoryExists = categories.some(
      (category) =>
        category.name.toLowerCase() === name.toLowerCase() &&
        category.type === type
    );

    if (categoryExists) {
      setShowError(true);
      setName("");
      setLimit("");
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    addCategory({
      name,
      type,
      ...(type === "expense" && { limit: Number(limit) }),
    });

    setName("");
    setLimit("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {showSuccess && (
        <Alert type="success" message="Kategori başarıyla eklendi!" />
      )}

      {showError && <Alert type="error" message="Bu kategori zaten mevcut!" />}

      <div>
        <label className="block mb-2 dark:text-white">İşlem Tipi</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "income" | "expense")}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="income">Gelir</option>
          <option value="expense">Gider</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 dark:text-white">Kategori Adı</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
            required
          />
        </div>
      )}

      <button
        type="submit"
        disabled={!name || (type === "expense" && !limit)}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:hover:bg-gray-400 dark:disabled:hover:bg-gray-600"
      >
        Ekle
      </button>
    </form>
  );
}
