// src/app/(admin)/page.tsx

import type { Metadata } from "next";
import Dashboard from "@/components/ecommerce/Dashboard";

export const metadata: Metadata = {
  title: "Personal Finance Manager | Dashboard",
  description: "Manage your personal finances with ease",
};

export default function Page() {
  return <Dashboard />;
}
