import { getAccountWithTransactions } from "@/actions/accounts";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import TransactionTable from "../_components/transaction-table";
import { BarLoader } from "react-spinners";

interface AccountPageProps {
  params: {
    id: string;
  };
}

const AccountPage = async ({ params }: AccountPageProps) => {
  const accountData = await getAccountWithTransactions(params.id);
  if (!accountData) {
    notFound();
  }
  // Render your component
  const { transactions, ...account } = accountData;

  return (
    <div className="px-5 space-y-8 ">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-black capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            Rp. {account.balance.toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Chart section */}

      {/* Transaction Table */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
};

export default AccountPage;
