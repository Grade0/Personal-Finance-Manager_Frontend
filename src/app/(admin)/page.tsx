import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import ComponentCard from "@/components/common/ComponentCard";
import PieChartTwo from "@/components/charts/pie/PieChartTwo";
import DataTableThree from "@/components/tables/DataTables/DataTableThree";
import WatchList from "@/components/stocks/WatchList";


export const metadata: Metadata = {
  title:
    "Personal Finance Manager",
  description: "Manage your personal finances with ease",
};

export default function Ecommerce() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Overview" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">

        <div className="col-span-12 space-y-6 xl:col-span-12">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <MonthlyTarget />

          <ComponentCard title="Spese per categoria">
          <PieChartTwo />
        </ComponentCard>

        <WatchList />
        </div>

        <div className="ol-span-12 xl:col-span-6 space-y-6">
        <ComponentCard title="Totale spese per categoria">
          <BasicTableOne />
        </ComponentCard>
      </div>

        <div className="col-span-12">
          <ComponentCard title="Data Table 3">
            <DataTableThree />
          </ComponentCard>
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
}
