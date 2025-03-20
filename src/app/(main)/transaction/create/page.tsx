import { getUserAccounts } from "@/actions/dashboard";
import React from "react";
import AddTransactionForm from "../_components/transaction-form";
import { defaultCategories } from "@/data/category"; // Pastikan tipe Account dan Category sudah didefinisikan

const AddTransactionPage = async () => {
  // Memanggil getUserAccounts sebagai fungsi
  const accounts = await getUserAccounts();

  return (
    <div className="px-5 max-w-2xl mx-auto">
      <h1 className="text-5xl text-black font-extrabold mb-8">
        Add Transaction
      </h1>

      <AddTransactionForm accounts={accounts} categories={defaultCategories} />
    </div>
  );
};

export default AddTransactionPage;
