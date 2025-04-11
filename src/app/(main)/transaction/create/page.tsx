import { getUserAccounts } from "@/actions/dashboard";
import AddTransactionForm from "../_components/transaction-form";
import { defaultCategories } from "@/data/category";
import { getTransactions } from "@/actions/transaction";
import { redirect } from "next/navigation";
import { checkUser } from "@/lib/checkUser";

export const dynamic = "force-dynamic";


export default async function AddTransactionPage({
  searchParams,
}: {
  searchParams: { edit?: string };
}) {
  // ✅ Ambil user dari DB
  const user = await checkUser();

  // ✅ Cek akses user
  if (!user || user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  const edit = searchParams.edit;

  const [accounts, transaction] = await Promise.all([
    getUserAccounts(),
    edit ? getTransactions(edit) : Promise.resolve(null),
  ]);

  return (
    <div className="px-5 max-w-2xl mx-auto">
      <h1 className="text-5xl text-black font-extrabold mb-8">
        {edit ? "Edit Transaction" : "Add Transaction"}
      </h1>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!edit}
        initialData={transaction || undefined}
        editId={edit}
      />
    </div>
  );
}
