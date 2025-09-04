"use client";

import React, { useState } from "react";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import ComponentCard from "@/components/common/ComponentCard";
import PieChartTwo from "@/components/charts/pie/PieChartTwo";
import DataTableThree from "@/components/tables/DataTables/DataTableThree";
import IncomeTable from "@/components/tables/IncomeTable";
import WatchList from "@/components/stocks/WatchList";
import MonthFilter from "@/components/ecommerce/MonthFilter";

export default function EcommercePageClient() {
  const [selectedMonth, setSelectedMonth] = useState("09");

  return (
    <div>
      <PageBreadcrumb pageTitle="Overview" />
      <MonthFilter selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />

      <div className="grid grid-cols-12 gap-4 md:gap-6 mt-4">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <EcommerceMetrics month={selectedMonth} />
          <MonthlySalesChart month={selectedMonth} />
        </div>

        <div className="col-span-12 space-y-6 xl:col-span-6">
          <ComponentCard title="Totale Entrate per fonte">
            <IncomeTable month={selectedMonth} />
          </ComponentCard>

          <MonthlyTarget month={selectedMonth} />

          <ComponentCard title="Spese per categoria">
            <PieChartTwo month={selectedMonth} />
          </ComponentCard>

          <WatchList month={selectedMonth} />
        </div>

        <div className="col-span-12 xl:col-span-6 space-y-6">
          <ComponentCard title="Totale spese per categoria">
            <BasicTableOne month={selectedMonth} />
          </ComponentCard>
        </div>

        <div className="col-span-12">
          <ComponentCard title="Transazioni del mese">
            <DataTableThree month={selectedMonth} />
          </ComponentCard>
        </div>
      </div>
    </div>
  );
}
