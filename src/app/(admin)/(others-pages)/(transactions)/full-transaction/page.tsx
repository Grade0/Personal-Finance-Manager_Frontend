import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FullTransactions from "@/components/tables/DataTables/FullTransactions";
import FullTransactions2 from "@/components/tables/DataTables/FullTransactions2";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Add Product | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js E-commerce  Add Product  TailAdmin Dashboard Template",
};

export default function TransactionPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Storico Transazioni" />
      <FullTransactions2 />
    </div>
  );
}