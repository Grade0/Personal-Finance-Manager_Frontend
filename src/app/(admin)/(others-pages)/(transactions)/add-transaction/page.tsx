import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TransactionForm from "@/components/form/TransactionForm";
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
      <PageBreadcrumb pageTitle="Inserisci nuova transazione" />
      <TransactionForm />
    </div>
  );
}