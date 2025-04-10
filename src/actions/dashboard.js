"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Serialize angka dari BigInt / Decimal
const serializeTransaction = (obj) => {
  const serialized = { ...obj };

  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }

  return serialized;
};

// 🟢 Create Account (khusus admin)
export async function createAccount(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance amount");
    }

    const exitingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    const shouldBeDefault =
      exitingAccounts.length === 0 ? true : data.isDefault;

    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id },
        data: { isDefault: false },
      });
    }

    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault,
      },
    });

    const serializedAccount = serializeTransaction(account);

    revalidatePath("/dashboard");
    return { success: true, data: serializedAccount };
  } catch (error) {
    throw new Error(error.message);
  }
}

// 🟢 Get All Accounts (Admin: akun sendiri, User: akun sendiri + akun admin)
export async function getUserAccounts() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const accounts = await db.account.findMany({
    where:
      user.role === "ADMIN"
        ? { userId: user.id }
        : {
            OR: [
              { userId: user.id },
              {
                user: { role: "ADMIN" },
              },
            ],
          },
    orderBy: { createAt: "desc" },
    include: {
      _count: {
        select: {
          transactions: true,
        },
      },
    },
  });

  return accounts.map(serializeTransaction);
}

// 🟢 Get Dashboard Transactions (Admin: transaksi sendiri, User: transaksi sendiri + admin)
export async function getDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const transactions = await db.transaction.findMany({
    where:
      user.role === "ADMIN"
        ? { userId: user.id }
        : {
            OR: [
              { userId: user.id },
              {
                user: { role: "ADMIN" },
              },
            ],
          },
    orderBy: { date: "desc" },
  });

  return transactions.map(serializeTransaction);
}
