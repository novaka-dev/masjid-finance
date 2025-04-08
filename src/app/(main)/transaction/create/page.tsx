import { getUserAccounts } from "@/actions/dashboard";
import React from "react";
import AddTransactionForm from "../_components/transaction-form";
import { defaultCategories } from "@/data/category"; // Pastikan tipe Account dan Category sudah didefinisikan
import { getTransactions } from "@/actions/transaction";

interface AddTransactionPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

const AddTransactionPage = async ({
  searchParams,
}: AddTransactionPageProps) => {
  // Memanggil getUserAccounts sebagai fungsi
  const accounts = await getUserAccounts();

  const editId = searchParams?.edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransactions(editId);
    initialData = transaction;
  }

  return (
    <div className="px-5 max-w-2xl mx-auto">
      <h1 className="text-5xl text-black font-extrabold mb-8">
        {editId ? "Edit Transaction" : "Add Transaction"}
      </h1>

      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
};

export default AddTransactionPage;
