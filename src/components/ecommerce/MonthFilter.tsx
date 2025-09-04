"use client";
import React from "react";

interface MonthFilterProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const months = [
  { value: "01", label: "Gennaio" },
  { value: "02", label: "Febbraio" },
  { value: "03", label: "Marzo" },
  { value: "04", label: "Aprile" },
  { value: "05", label: "Maggio" },
  { value: "06", label: "Giugno" },
  { value: "07", label: "Luglio" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Settembre" },
  { value: "10", label: "Ottobre" },
  { value: "11", label: "Novembre" },
  { value: "12", label: "Dicembre" },
];

const MonthFilter: React.FC<MonthFilterProps> = ({
  selectedMonth,
  onMonthChange,
}) => {
  return (
    <div className="hidden lg:block">
      <select
        className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 
                   h-11 rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-11 text-sm 
                   text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden 
                   dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
        value={selectedMonth}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onMonthChange(e.target.value)
        }
      >
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthFilter;
