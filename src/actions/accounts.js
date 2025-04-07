"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Serialisasi transaksi agar tidak ada error saat mengonversi BigInt
const serializeTransaction = (obj) => {
  const serialized = { ...obj };

  if (obj.balance !== undefined && obj.balance !== null) {
    serialized.balance = Number(obj.balance);
  }
  if (obj.amount !== undefined && obj.amount !== null) {
    serialized.amount = Number(obj.amount);
  }

  return serialized;
};

// Fungsi untuk mengupdate akun default
export async function updateDefaultAccount(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Set semua akun lain menjadi non-default
    await db.account.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false },
    });

    // Set akun yang dipilih menjadi default
    const account = await db.account.update({
      where: { id: accountId, userId: user.id },
      data: { isDefault: true },
    });

    revalidatePath("/dashboard");
    return { success: true, data: serializeTransaction(account) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Fungsi untuk mengambil akun beserta transaksinya
export async function getAccountWithTransactions(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const account = await db.account.findUnique({
      where: { id: accountId, userId: user.id },
      include: {
        transactions: {
          orderBy: { date: "desc" },
        },
        _count: {
          select: { transactions: true },
        },
      },
    });

    if (!account) return null;

    return {
      ...serializeTransaction(account),
      transactions: account.transactions.map(serializeTransaction),
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Fungsi untuk menghapus transaksi dalam jumlah besar
export async function bulkDeleteTransactions(transactionIds) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const transactions = await db.transaction.findMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });

    if (transactions.length === 0) {
      return { success: false, error: "No transactions found" };
    }

    const accountBalanceChanges = transactions.reduce((acc, transaction) => {
      const change =
        transaction.type === "EXPENSE"
          ? -transaction.amount // Jika EXPENSE dihapus, saldo harus bertambah (karena mengurangi pengeluaran)
          : transaction.amount; // Jika INCOME dihapus, saldo harus berkurang (karena mengurangi pemasukan)

      acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
      return acc;
    }, {});

    await db.$transaction(async (tx) => {
      // Hapus transaksi terlebih dahulu
      await tx.transaction.deleteMany({
        where: {
          id: { in: transactionIds },
          userId: user.id,
        },
      });

      // Perbarui saldo akun setelah transaksi dihapus
      for (const [accountId] of Object.entries(accountBalanceChanges)) {
        const remainingTransactions = await tx.transaction.findMany({
          where: { accountId },
          orderBy: { date: "asc" }, // Urutkan transaksi untuk mendapatkan saldo akhir
        });

        const newBalance = remainingTransactions.reduce((total, t) => {
          return t.type === "EXPENSE" ? total - t.amount : total + t.amount;
        }, 0);

        await tx.account.update({
          where: { id: accountId },
          data: { balance: newBalance },
        });
      }
    });

    revalidatePath("/dashboard");
    revalidatePath("/account/[id]");

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Pastikan semua fungsi diexport dengan benar
export { getAccountWithTransactions };
