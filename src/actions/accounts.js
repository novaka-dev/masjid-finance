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

    // Ambil semua transaksi yang akan dihapus
    const transactions = await db.transaction.findMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });

    if (transactions.length === 0) {
      return { success: false, error: "No transactions found" };
    }

    // Ambil semua accountId unik dari transaksi yang dihapus
    const affectedAccountIds = [
      ...new Set(transactions.map((t) => t.accountId)),
    ];

    await db.$transaction(async (tx) => {
      // Hapus transaksi terlebih dahulu
      await tx.transaction.deleteMany({
        where: {
          id: { in: transactionIds },
          userId: user.id,
        },
      });

      // Recalculate saldo untuk setiap akun terkait
      for (const accountId of affectedAccountIds) {
        const remainingTransactions = await tx.transaction.findMany({
          where: { accountId },
          orderBy: { date: "asc" }, // untuk jaga-jaga urutan
        });

        const newBalance = remainingTransactions.reduce((total, t) => {
          const amount = Number(t.amount);
          return t.type === "EXPENSE" ? total - amount : total + amount;
        }, 0);

        await tx.account.update({
          where: { id: accountId },
          data: { balance: newBalance },
        });
      }
    });

    // Refresh halaman
    revalidatePath("/dashboard");
    revalidatePath("/account/[id]");

    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: error.message };
  }
}
