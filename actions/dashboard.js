"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
  const serialized = { ...obj };

  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
};

export async function createAccount() {
  try {
    const { userId } = await auth();
    if (!!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // conver balance to float before saving
    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance amount");
    }

    // Cek jika ini adalah akun pertama yang dibuat (default account)
    const exitingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    const shouldBeDefault =
      exitingAccounts.length === 0 ? true : data.isDefault;

    // If this account should be default, unset other default accounts
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
    return { seuccess: true, data: serializedAccount };
  } catch (error) {
    throw new Error(error.message);
  }
}
