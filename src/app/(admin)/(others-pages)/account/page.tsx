import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AccountCard from "@/components/account/AccountCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Finance Manager | Account",
  description: "Manage your personal finances with ease",
};

const accounts = [
  {
    name: "Monte dei Paschi di Siena",
    type: "Banca",
    balance: 192.53,
    lastTransaction: "20/01/2024",
  },
  {
    name: "UniCredit",
    type: "Banca",
    balance: 320.10,
    lastTransaction: "15/02/2024",
  },
  {
    name: "Portafoglio",
    type: "Contanti",
    balance: 510.75,
    lastTransaction: "10/03/2024",
  },
  {
    name: "Risparmio",
    type: "Contanti",
    balance: 510.75,
    lastTransaction: "10/03/2024",
  },
];

export default function AccountPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Conti" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {accounts.map((account, index) => (
        <AccountCard
          key={index}
          name={account.name}
          type={account.type}
          balance={account.balance}
          lastTransaction={account.lastTransaction}
        />
      ))}
    </div>
    </div>
  );
}