import React from "react";
import { CardDescription, CardTitle } from "../ui/card";
import { Landmark, Banknote } from 'lucide-react';
import Link from "next/link";

export default function AccountCard({ name, type, balance, lastTransaction }) {
  const getIcon = (type) => {
    switch (type) {
      case "Contanti":
        return <Banknote width={40} height={40} alt="cash" />;
      case "Risparmio":
        return <PiggyBank width={40} height={40} alt="cash" />;
      case "Banca":
      default:
        return <Landmark width={40} height={40} alt="bank" />;
    }
  };

  return (
    <div>
      <div className="border border-gray-300 rounded-2xl bg-white p-5 dark:border-gray-700   dark:bg-white/[0.03]">
        <div className="flex items-center justify-between pb-5 mb-5 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10">
              {getIcon(type)}
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                {name}
              </h3>
              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                {type}
              </span>
            </div>
          </div>

          <div>
            <div>
              <h4 className="mb-1 font-medium text-right text-gray-700 text-theme-sm dark:text-gray-200">
                ${balance.toFixed(2)}
              </h4>
            </div>

            <span className="flex items-center justify-end gap-1 font-medium text-theme-xs text-success-600 dark:text-success-500">
              <svg
                className="fill-current"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.56462 1.62394C5.70193 1.47073 5.90135 1.37433 6.12329 1.37433C6.1236 1.37433 6.12391 1.37433 6.12422 1.37433C6.31631 1.37416 6.50845 1.44732 6.65505 1.59381L9.65514 4.59181C9.94814 4.8846 9.94831 5.35947 9.65552 5.65247C9.36273 5.94546 8.88785 5.94563 8.59486 5.65284L6.87329 3.93248L6.87329 10.125C6.87329 10.5392 6.53751 10.875 6.12329 10.875C5.70908 10.875 5.37329 10.5392 5.37329 10.125L5.37329 3.93579L3.65516 5.65282C3.36218 5.94562 2.8873 5.94547 2.5945 5.65249C2.3017 5.3595 2.30185 4.88463 2.59484 4.59183L5.56462 1.62394Z"
                  fill=""
                />
              </svg>
              1.01%
            </span>
          </div>
        </div>
        <span className="block text-gray-500 text-theme-xs dark:text-gray-400 mb-4">
          Ultima transazione: {lastTransaction}
        </span>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center w-full p-3 font-medium text-white rounded-lg bg-brand-500 text-theme-sm shadow-theme-xs hover:bg-brand-600">
            Dettagli
          </button>

          <button className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white p-3 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
            Modifica
          </button>
        </div>
      </div>
    </div>
  );
}
