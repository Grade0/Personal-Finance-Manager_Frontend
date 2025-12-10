"use client";
import React, { useMemo, useState } from "react";
import TableDropdown from "@/components/common/TableDropdown";
import TypeFilter from "./TypeFilter";
import FilterDropdown from "./FilterDropdown";
import { FileCheck, Trash2, Upload } from 'lucide-react';
import Link from "next/link";
import Pagination from "./Pagination";
import Button from "@/components/ui/button/Button";

interface Transaction {
  id: number;
  name: string;
  description: string;
  account: string;
  category: string;
  date: string;
  type: "income" | "expense" | "refund";
  status: "Conciliato" | "Non conciliato";
  amount: string;
}

interface SortState {
  key: "name" | "account" | "category" | "date" | "amount";
  asc: boolean;
}

const transactionData: Transaction[] = [
  {
    id: 1,
    name: "iCloud+",
    description: "Pagamento tramite Paypal",
    account: "Unicredit",
    category: "Abbonamento",
    date: "01/08/2025",
    type: "expense",
    status: "Conciliato",
    amount: "-€ 2,99",
  },
  {
    id: 2,
    name: "Netflix",
    description: "Pagamento mensile carta di credito",
    account: "Intesa Sanpaolo",
    category: "Abbonamento",
    date: "03/08/2025",
    type: "expense",
    status: "Conciliato",
    amount: "-€ 9,99",
  },
  {
    id: 3,
    name: "Esselunga",
    description: "Spesa alimentare settimanale",
    account: "Carta di debito",
    category: "Spesa",
    date: "05/08/2025",
    type: "expense",
    status: "Conciliato",
    amount: "-€ 75,45",
  },
  {
    id: 4,
    name: "Trenitalia",
    description: "Biglietto treno Roma-Milano",
    account: "Carta di credito",
    category: "Trasporti",
    date: "08/08/2025",
    type: "expense",
    status: "Non conciliato",
    amount: "-€ 49,90",
  },
  {
    id: 5,
    name: "Stipendio",
    description: "Mensilità agosto 2025",
    account: "Paypal",
    category: "Abbonamento",
    date: "10/08/2025",
    type: "income",
    status: "Non conciliato",
    amount: "€ 1000",
  },
  {
    id: 6,
    name: "H&M",
    description: "Acquisto abbigliamento estivo",
    account: "Carta di credito",
    category: "Abbigliamento",
    date: "16/08/2025",
    type: "expense",
    status: "Non conciliato",
    amount: "-€ 89,50",
  },
  {
    id: 7,
    name: "Enel Energia",
    description: "Bolletta elettrica mensile",
    account: "RID",
    category: "Utenze",
    date: "18/08/2025",
    type: "expense",
    status: "Non conciliato",
    amount: "-€ 65,20",
  },
  {
    id: 8,
    name: "Rimborso Amazon",
    description: "Reso del libro",
    account: "Carta di debito",
    category: "E-commerce",
    date: "20/08/2025",
    type: "refund",
    status: "Non conciliato",
    amount: "€ 42,75",
  },
  {
    id: 9,
    name: "Giroconto",
    description: "Sbloccare liquidità da risparmio",
    account: "Risparmio",
    category: "Trasferimento",
    date: "22/08/2025",
    type: "transfer",
    status: "Non conciliato",
    amount: "-€ 100,00",
  },
  {
    id: 10,
    name: "Giroconto",
    description: "Sbloccare liquidità da risparmio",
    account: "Contanti",
    category: "Trasferimento",
    date: "22/08/2025",
    type: "transfer",
    status: "Non conciliato",
    amount: "€ 100,00",
  },
];

const FullTransactions2: React.FC = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

  const [showFilter, setShowFilter] = React.useState(false);

  // Rows per page handler
  const handleRowsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const newRowsPerPage = parseInt(e.target.value, 10); // Ensure base 10 parsing
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to first page when rows per page changes
  };



  const [transactions] = React.useState<Transaction[]>(transactionData);
  const [selected, setSelected] = React.useState<number[]>([]);
  const [sort, setSort] = React.useState<SortState>({
    key: "date",
    asc: false,
  });

  const [filterType, setFilterType] = useState<
    "all" | "income" | "expense" | "transfer"
  >("all");

  // per filtrare il tipo di transazione se è un entrata, uscita o transfer
  const filteredTransactions: Transaction[] = useMemo(() => {
    return filterType === "all"
      ? transactions
      : transactions.filter((transaction) => transaction.type === filterType);
  }, [transactions, filterType]);

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [search, setSearch] = React.useState<string>("");
  const [filterDays, setFilterDays] = React.useState<string>("Last 7 Days");

  const sortedRows: Transaction[] = React.useMemo(() => {
    return [...transactions].sort((a, b) => {
      let valA = a[sort.key];
      let valB = b[sort.key];
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
      if (valA < valB) return sort.asc ? -1 : 1;
      if (valA > valB) return sort.asc ? 1 : -1;
      return 0;
    });
  }, [transactions, sort]);

// per filtrare in base alla ricerca su nome, conto e categoria
const filteredRows: Transaction[] = useMemo(() => {
  return sortedRows.filter((row) => {

    // Verifica se il testo cercato è contenuto in almeno uno di questi tre campi
    const matchesSearch =
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.account.toLowerCase().includes(search.toLowerCase()) ||
      row.category.toLowerCase().includes(search.toLowerCase());

    // Se filterType === "all", accetta tutti i tipi, altrimenti solo del tipo ("income", "expense", "transfer") selezionato
    const matchesType =
      filterType === "all" || row.type === filterType;

    // Restituisce solo le righe che soddifano la ricerca e il tipo selezionato
    return matchesSearch && matchesType;
  });
}, [sortedRows, search, filterType]);

  const totalEntries = filteredRows.length; 
  const totalPages: number = Math.ceil(transactions.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalEntries);

  const handlePageChange = (page: number) => {
    // setCurrentPage(page);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedRows: Transaction[] = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const toggleSelectAll = (): void => {
    if (selected.length === paginatedRows.length) {
      setSelected([]);
    } else {
      setSelected(paginatedRows.map((row) => row.id));
    }
  };

  const updateSelectAll = (): void => {
    const allSelected = paginatedRows.every((row) => selected.includes(row.id));
    if (allSelected && selected.length !== paginatedRows.length) {
      setSelected(paginatedRows.map((row) => row.id));
    }
  };

  const toggleRow = (id: number): void => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    updateSelectAll();
  };

  const sortBy = (key: "name" | "account" | "category" | "date" | "amount"): void => {
    setSort((prev) => ({
      key,
      asc: prev.key === key ? !prev.asc : true,
    }));
    setPage(1);
  };

  const goToPage = (n: number): void => {
    if (n >= 1 && n <= totalPages) setPage(n);
  };

  const handleViewMore = () => {
    //logic will be there
  };

  const handleDelete = () => {
    //logic will be there
  };

  return (
    <div className="text-sm overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col justify-between gap-5 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center dark:border-gray-800">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Transazioni
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            La lista delle transazioni più recenti
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">
            Export
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M16.667 13.3333V15.4166C16.667 16.1069 16.1074 16.6666 15.417 16.6666H4.58295C3.89259 16.6666 3.33295 16.1069 3.33295 15.4166V13.3333M10.0013 13.3333L10.0013 3.33325M6.14547 9.47942L9.99951 13.331L13.8538 9.47942"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <Link
            href="/add-transaction"
            className="bg-brand-500 shadow-sm hover inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition hover:bg-brand-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M5 10.0002H15.0006M10.0002 5V15.0006"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Nuova transazione
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <span className="text-gray-500 dark:text-gray-400"> Show </span>
          <div className="relative z-20 bg-transparent">
            <select
              className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option
                value="10"
                className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
              >
                10
              </option>
              <option
                value="8"
                className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
              >
                8
              </option>
              <option
                value="5"
                className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
              >
                5
              </option>
            </select>
            <span className="absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400">
              <svg
                className="stroke-current"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <span className="text-gray-500 dark:text-gray-400"> entries </span>
        </div>
        <div className="flex gap-3.5">

          <TypeFilter
            filterType={filterType}
            setFilterType={setFilterType}
            setCurrentPage={setCurrentPage}
          />

          <div className="hidden flex-col gap-3 sm:flex sm:flex-row sm:items-center">
            <div className="relative">
              <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
                    fill=""
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[300px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
              />
            </div>
            <div className="hidden lg:block">
              <select
                className="shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                value={filterDays}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFilterDays(e.target.value)
                }
              >
                <option>Last 7 Days</option>
                <option>Last 10 Days</option>
                <option>Last 15 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>

            <FilterDropdown showFilter={showFilter} setShowFilter={setShowFilter} />

            <div>
              <button className="text-gray-500 hover:text-success-500 dark:text-gray-400 dark:hover:text-success-500">
                <FileCheck />
              </button>
            </div>
            <div>
              <button className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500">
                <Trash2 />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-scrollbar overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200 dark:divide-gray-800 dark:border-gray-800">
              <th className="p-4">
                <div className="flex w-full items-center gap-3">
                  <label className="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
                    <span className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selected.length === paginatedRows.length}
                        onChange={toggleSelectAll}
                      />
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px] ${
                          selected.length === paginatedRows.length
                            ? "border-brand-500 bg-brand-500"
                            : "bg-transparent border-gray-300 dark:border-gray-700"
                        }`}
                      >
                        <span
                          className={
                            selected.length === paginatedRows.length
                              ? ""
                              : "opacity-0"
                          }
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 3L4.5 8.5L2 6"
                              stroke="white"
                              strokeWidth="1.6666"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </span>
                    </span>
                  </label>
                  <div
                  className="flex cursor-pointer items-center gap-3"
                  onClick={() => sortBy("name")}
                >
                  <p className="text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                    Voce
                  </p>
                  <span className="flex flex-col gap-0.5">
                    <svg
                      className={
                        sort.key === "name" && sort.asc
                          ? "text-gray-800 dark:text-gray-400"
                          : "text-gray-300"
                      }
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                        fill="currentColor"
                      />
                    </svg>
                    <svg
                      className={
                        sort.key === "name" && !sort.asc
                          ? "text-gray-800 dark:text-gray-400"
                          : "text-gray-300"
                      }
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
                </div>
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                <p className="text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                  Descrizione
                </p>
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                <div
                  className="flex cursor-pointer items-center gap-3"
                  onClick={() => sortBy("account")}
                >
                  <p className="text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                    Conto
                  </p>
                  <span className="flex flex-col gap-0.5">
                    <svg
                      className={
                        sort.key === "account" && sort.asc
                          ? "text-gray-800 dark:text-gray-400"
                          : "text-gray-300"
                      }
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                        fill="currentColor"
                      />
                    </svg>
                    <svg
                      className={
                        sort.key === "account" && !sort.asc
                          ? "text-gray-800 dark:text-gray-400"
                          : "text-gray-300"
                      }
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                <div
                  className="flex cursor-pointer items-center gap-3"
                  onClick={() => sortBy("category")}
                >
                  <p className="text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                    Categoria
                  </p>
                  <span className="flex flex-col gap-0.5">
                    <svg
                      className={
                        sort.key === "category" && sort.asc
                          ? "text-gray-800 dark:text-gray-400"
                          : "text-gray-300"
                      }
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                        fill="currentColor"
                      />
                    </svg>
                    <svg
                      className={
                        sort.key === "category" && !sort.asc
                          ? "text-gray-800 dark:text-gray-400"
                          : "text-gray-300"
                      }
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                <div
                  className="flex cursor-pointer items-center gap-3"
                  onClick={() => sortBy("date")}
                >
                  <p className="text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                    Data
                  </p>
                  <span className="flex flex-col gap-0.5">
                    <svg
                      className={
                        sort.key === "date" && sort.asc
                          ? "text-gray-800 dark:text-gray-400"
                          : "text-gray-300"
                      }
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                        fill="currentColor"
                      />
                    </svg>
                    <svg
                      className={
                        sort.key === "date" && !sort.asc
                          ? "text-gray-800 dark:text-gray-400"
                          : "text-gray-300"
                      }
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>

              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                <div
                  className="flex cursor-pointer items-center gap-3"
                  onClick={() => sortBy("amount")}
                >
                  <p className="text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                    Importo
                  </p>
                  <span className="flex flex-col gap-0.5">
                    <svg
                      className={
                        sort.key === "amount" && sort.asc
                          ? "text-gray-800 dark:text-gray-400"
                          : "text-gray-300"
                      }
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                        fill="currentColor"
                      />
                    </svg>
                    <svg
                      className={
                        sort.key === "amount" && !sort.asc
                          ? "text-gray-800 dark:text-gray-400"
                          : "text-gray-300"
                      }
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>

              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
              </th>
            </tr>
          </thead>
          <tbody className="divide-x divide-y divide-gray-200 dark:divide-gray-800">
            {paginatedRows.map((row: Transaction, index) => (
              <tr
                key={row.id}
                className={`
                  transition hover:bg-gray-50 dark:hover:bg-gray-900
                  ${index === paginatedRows.length - 1 ? 'border-b border-gray-200 dark:border-gray-800' : ''}
                `}>
                <td className="p-4 whitespace-nowrap">
                  <div className="group flex items-center gap-3">
                    <label className="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
                      <span className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={selected.includes(row.id)}
                          onChange={() => toggleRow(row.id)}
                        />
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px] ${
                            selected.includes(row.id)
                              ? "border-brand-500 bg-brand-500"
                              : "bg-transparent border-gray-300 dark:border-gray-700"
                          }`}
                        >
                          <span
                            className={
                              selected.includes(row.id) ? "" : "opacity-0"
                            }
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="white"
                                strokeWidth="1.6666"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </span>
                      </span>
                    </label>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                      {row.name}
                    </span>
                  </div>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {row.description}
                  </p>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {row.account}
                  </p>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    {row.category}
                  </p>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    {row.date}
                  </p>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <span
                    className={`text-theme-xs rounded-full px-2 py-0.5 font-medium ${
                      row.status === "Conciliato"
                        ? "bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500"
                        : row.status === "Non conciliato"
                        ? "bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-500"
                        : "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-500"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <span
                    className={`text-theme-xs rounded-full px-2 py-0.5 font-medium ${
                      row.type === "income" || row.type === "refund"
                        ? "text-success-700 dark:text-success-500"
                        : row.type === "transfer"
                        ? "text-gray-700 dark:text-gray-500"
                        : "text-red-700 dark:text-red-500"
                    }`}
                  >
                    {row.amount}
                  </span>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <div className="relative inline-block">
                    <TableDropdown
                      dropdownButton={
                        <button className="text-gray-500 dark:text-gray-400 ">
                          <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      }
                      dropdownContent={
                        <>
                          <button
                            onClick={handleViewMore}
                            className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                          >
                            View More
                          </button>
                          <button
                            onClick={handleDelete}
                            className="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                          >
                            Delete
                          </button>
                        </>
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
          {/* Left side: Showing entries */}
          <div className="pb-3 xl:pb-0">
            <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
              Showing {startIndex + 1} to {endIndex} of {totalEntries} entries
            </p>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FullTransactions2;