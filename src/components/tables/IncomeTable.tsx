import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import Image from "next/image";

interface Order {
  id: number;
  sourceName: string;
  flow: string;
  totaleRevenue: string;
}

// Define the table data using the interface
const tableData: Incomes[] = [
  { id: 1, sourceName: "Stipendio", flow: "Banca MPS", totalRevenue: "1000.00" },
  { id: 2, sourceName: "Freelance", flow: "Revolut", totalRevenue: "300.00" },
  { id: 3, sourceName: "Attività", flow: "Unicredit", totalRevenue: "100.00" },
  { id: 4, sourceName: "Investimento", flow: "IsyBank", totalRevenue: "200.00" },
  { id: 5, sourceName: "Regali", flow: "BuddyBank", totalRevenue: "100.00" },
  { id: 6, sourceName: "Altri", flow: "Contanti", totalRevenue: "1500.00" },
];

export default function IncomeTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[552px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-800 text-start text-theme-xs dark:text-gray-400"
                >
                  Fonte di reddito
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-800 text-start text-theme-xs dark:text-gray-400"
                >
                  Flusso
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-800 text-start text-theme-xs dark:text-gray-400"
                >
                  Totale entrata
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((incomes) => (
                <TableRow key={incomes.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {incomes.sourceName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {incomes.flow}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {incomes.totalRevenue}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
