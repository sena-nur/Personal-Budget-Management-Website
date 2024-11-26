import { tr } from "date-fns/locale";
import { format } from "date-fns";

interface DateSelectorProps {
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

export default function DateSelector({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}: DateSelectorProps) {
  const months = Array.from({ length: 12 }, (_, i) =>
    format(new Date(2024, i, 1), "MMMM", { locale: tr })
  );

  const startYear = 2020;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  );

  return (
    <div className="flex gap-4 mb-4">
      <select
        value={selectedMonth}
        onChange={(e) => onMonthChange(Number(e.target.value))}
        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
          bg-white dark:bg-gray-700 
          text-gray-900 dark:text-white 
          border-gray-300 dark:border-gray-600 
          hover:border-blue-500 dark:hover:border-blue-400
          transition-colors"
      >
        {months.map((month, index) => (
          <option
            key={month}
            value={index}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {month}
          </option>
        ))}
      </select>

      <select
        value={selectedYear}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
          bg-white dark:bg-gray-700 
          text-gray-900 dark:text-white 
          border-gray-300 dark:border-gray-600 
          hover:border-blue-500 dark:hover:border-blue-400
          transition-colors"
      >
        {years.map((year) => (
          <option
            key={year}
            value={year}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
