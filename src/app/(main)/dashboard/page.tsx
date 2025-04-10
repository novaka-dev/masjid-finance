import { getDashboardData, getUserAccounts } from "@/actions/dashboard";
import CreateAccountSheet from "@/components/create-account-sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { Suspense } from "react";
import AccountCard from "./_components/account-card";
import DashboardOverview from "./_components/transaction-overview";
import { checkUser } from "@/lib/checkUser"; // ⬅️ ambil data user termasuk role
import { isAdmin } from "@/lib/check-role"; // ⬅️ fungsi helper

async function DashboardPage() {
  const user = await checkUser();

  if (!user) {
    // Jika belum login atau error
    return <div className="text-center text-red-500">Unauthorized</div>;
  }

  const accounts = await getUserAccounts();
  const transaction = await getDashboardData();

  return (
    <div className="px-5">
      {/* Overview */}
      <Suspense fallback={"Loading overview"}>
        <DashboardOverview accounts={accounts} transactions={transaction} />
      </Suspense>

      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isAdmin(user) && ( // ⬅️ hanya ADMIN yang bisa create account
          <CreateAccountSheet>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
              <CardContent className="flex flex-col items-center justify-center h-full pt-5 text-muted-foreground">
                <Plus className="h-10 w-10 mb-2 " />
                <p className="text-sm font-medium">Add New Account</p>
              </CardContent>
            </Card>
          </CreateAccountSheet>
        )}

        {accounts.length > 0 &&
          accounts?.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              userRole={user.role}
            />
          ))}
      </div>
    </div>
  );
}

export default DashboardPage;
