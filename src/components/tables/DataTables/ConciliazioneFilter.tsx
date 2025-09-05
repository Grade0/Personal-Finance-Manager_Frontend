"use client";
import React from "react";

interface ConciliazioneFilterProps {
  filterStatus: "All" | "Conciliato" | "Non conciliato";
  setFilterStatus: (status: filterStatus) => void;
  setCurrentPage: (page: number) => void;
}

const ConciliazioneFilter: React.FC<ConciliazioneFilterProps> = ({
  filterStatus,
  setFilterStatus,
  setCurrentPage,
}) => {
  return (
    <div className="hidden h-11 items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 lg:inline-flex dark:bg-gray-900">
      <button
        onClick={() => {
          setFilterStatus("All");
          setCurrentPage(1);
        }}
        className={`text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white ${
          filterStatus === "All"
            ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        Tutto
      </button>
      <button
        onClick={() => {
          setFilterStatus("Conciliato");
          setCurrentPage(1);
        }}
        className={`text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white ${
          filterStatus === "Conciliato"
            ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        Conciliato
      </button>
      <button
        onClick={() => {
          setFilterStatus("Non conciliato");
          setCurrentPage(1);
        }}
        className={`text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white ${
          filterStatus === "Non conciliato"
            ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        Non conciliato
      </button>
    </div>
  );
};

export default ConciliazioneFilter;
