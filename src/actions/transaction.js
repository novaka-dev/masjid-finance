"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Fungsi untuk mengonversi amount dari Decimal ke number
const serializeAmount = (obj) => ({
  ...obj,
  amount: obj.amount.toNumber(), // Pastikan amount dikonversi ke number
});

export async function createTransaction(data) {
  try {
    // Ambil userId dari auth
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Cari user berdasarkan clerkUserId
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Cari akun berdasarkan accountId dan userId
    const account = await db.account.findUnique({
      where: {
        id: data.accountId,
        userId: user.id,
      },
    });

    if (!account) {
      throw new Error("Account not found");
    }

    // Hitung perubahan balance berdasarkan tipe transaksi
    const balanceChange = data.type === "EXPENSE" ? -data.amount : data.amount;
    const newBalance = account.balance.toNumber() + balanceChange;

    // Mulai transaksi database
    const transaction = await db.$transaction(async (tx) => {
      // Buat transaksi baru
      const newTransaction = await tx.transaction.create({
        data: {
          ...data,
          descriptions: data.description,
          userId: user.id, // Perbaikan: gunakan `userId`, bukan `useId`
        },
      });

      // Update balance akun
      await tx.account.update({
        where: { id: data.accountId },
        data: { balance: newBalance },
      });

      return newTransaction;
    });

    // Revalidate path untuk memperbarui cache
    revalidatePath("/dashboard");
    revalidatePath(`/account/${transaction.accountId}`);

    // Kembalikan respons sukses
    return { success: true, data: serializeAmount(transaction) }; // Perbaikan: gunakan `success`, bukan `succes`
  } catch (error) {
    // Tangani error dan lempar pesan error yang lebih spesifik
    throw new Error(`Failed to create transaction: ${error.message}`);
  }
}
