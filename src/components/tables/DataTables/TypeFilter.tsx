"use client";
import React from "react";

interface TypeFilterProps {
  filterType: "all" | "income" | "expense" | "transfer";
  setFilterType: (type: filterType) => void;
  setCurrentPage: (page: number) => void;
}

const TypeFilter: React.FC<ConciliazioneFilterProps> = ({
  filterType,
  setFilterType,
  setCurrentPage,
}) => {
  return (
    <div className="hidden h-11 items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 lg:inline-flex dark:bg-gray-900">
      <button
        onClick={() => {
          setFilterType("all");
          setCurrentPage(1);
        }}
        className={`text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white ${
          filterType === "all"
            ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        Tutti
      </button>
      <button
        onClick={() => {
          setFilterType("income");
          setCurrentPage(1);
        }}
        className={`text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white ${
          filterType === "income"
            ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        Entrate
      </button>
      <button
        onClick={() => {
          setFilterType("expense");
          setCurrentPage(1);
        }}
        className={`text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white ${
          filterType === "expense"
            ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        Uscite
      </button>
      <button
        onClick={() => {
          setFilterType("transfer");
          setCurrentPage(1);
        }}
        className={`text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white ${
          filterType === "transfer"
            ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        Transfer
      </button>
    </div>
  );
};

export default TypeFilter;
