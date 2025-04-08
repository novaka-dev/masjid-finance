"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import aj from "@/lib/arcjet";
import { request } from "@arcjet/next";

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

    // Arcjet untuk membatasi jumlah transaksi
    // Request data from arcjet
    const req = await request();
    // Cek limit rate
    const decision = await aj.protect(req, {
      userId,
      requested: 1, //spesifi bagaimana token digunakan
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimited()) {
        const { remaining, reset } = decision.reason;
        console.error({
          code: "RATE_LIMITED_EXCEEDED",
          details: {
            remaining,
            resetInSeconds: reset,
          },
        });

        throw new Error(
          "Terlalu banyak memasukan transaksi, Mohon coba lagi nanti"
        );
      }
      throw new Error("Terjadi kesalahan, Mohon coba lagi nanti");
    }

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
          descriptions: data.descriptions,
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

export async function getTransactions(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const transaction = await db.transaction.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!transaction) throw new Error("Transaction not found");

  return serializeAmount(transaction);
}

export async function updateTransaction(id, data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Get original transaction untuk mengubah perubahan
    const originalTransaction = await db.transaction.findUnique({
      where: {
        id,
        userId: user.id,
      },
      include: {
        account: true,
      },
    });

    if (!originalTransaction) throw new Error("Transaction not found");

    // Hitung perubahan balance berdasarkan tipe transaksi
    const oldBalanceChange =
      originalTransaction.type === "EXPENSE"
        ? -originalTransaction.amount.toNumber()
        : originalTransaction.amount.toNumber();

    const newBalanceChange =
      data.type === "EXPENSE" ? -data.amount : data.amount;

    const netBalanceChange = newBalanceChange - oldBalanceChange;

    // Update transaksi dan account balance di transaksi
    const transaction = await db.$transaction(async (tx) => {
      const updated = await tx.transaction.update({
        where: {
          id,
          userId: user.id,
        },
        data,
      });

      // Update balance akun
      await tx.account.update({
        where: {
          id: data.accountId,
        },
        data: {
          balance: {
            increment: netBalanceChange,
          },
        },
      });

      return updated;
    });

    revalidatePath("/dashboard");
    revalidatePath(`/account/${data.accountId}`);

    return { success: true, data: serializeAmount(transaction) };
  } catch (error) {
    throw new Error(`Failed to update transaction: ${error.message}`);
  }
}
