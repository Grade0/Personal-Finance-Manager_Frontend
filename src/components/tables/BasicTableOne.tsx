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
  categoryName: string;
  totaleExpense: string;
}

// Define the table data using the interface
const tableData: Order[] = [
  { id: 1, categoryName: "Affitto", totalExpense: "1000.00" },
  { id: 2, categoryName: "Spesa", totalExpense: "300.00" },
  { id: 3, categoryName: "Trasporti", totalExpense: "100.00" },
  { id: 4, categoryName: "Utenze", totalExpense: "200.00" },
  { id: 5, categoryName: "Intrattenimento", totalExpense: "100.00" },
  { id: 6, categoryName: "Ristoranti", totalExpense: "1500.00" },
  { id: 7, categoryName: "Abbigliamento", totalExpense: "900.00" },
  { id: 8, categoryName: "Macchina", totalExpense: "700.00" },
  { id: 9, categoryName: "Salute", totalExpense: "1000.00" },
  { id: 10, categoryName: "Istruzione", totalExpense: "1300.00" },
  { id: 11, categoryName: "Viaggi", totalExpense: "2000.00" },
  { id: 12, categoryName: "Elettronica", totalExpense: "500.00" },
  { id: 13, categoryName: "Regali", totalExpense: "400.00" },
  { id: 14, categoryName: "Sport", totalExpense: "300.00" },
  { id: 15, categoryName: "Libri", totalExpense: "200.00" },
  { id: 16, categoryName: "Cura personale", totalExpense: "600.00" },
  { id: 17, categoryName: "Abbonamento", totalExpense: "500.00" },
  { id: 18, categoryName: "Ricariche telefoniche", totalExpense: "200.00" },
  { id: 19, categoryName: "Tasse", totalExpense: "1800.00" },
  { id: 20, categoryName: "Mobili", totalExpense: "50.00" },
  { id: 21, categoryName: "Manutenzione casa", totalExpense: "1800.00" },
  { id: 22, categoryName: "Anticipo per altri", totalExpense: "1800.00" },
  { id: 23, categoryName: "Altro", totalExpense: "400.00" },
];

export default function BasicTableOne() {
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
                  Categoria
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-800 text-start text-theme-xs dark:text-gray-400"
                >
                  Totale speso
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.categoryName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order.totalExpense}
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
