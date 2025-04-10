import { auth } from "@clerk/nextjs/server";
import { db } from "./prisma";
import { Role } from "@prisma/client";

export const checkUser = async () => {
  const { userId } = await auth();

  if (!userId) return null;

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (loggedInUser) return loggedInUser;

    // Kalau belum ada user di database, kita ambil info via Clerk API
    const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    const user = await response.json();

    const name = `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim();

    const roleFromMetadata = (
      user.public_metadata?.role as string
    )?.toUpperCase();
    const role: Role = roleFromMetadata === "ADMIN" ? "ADMIN" : "USER";

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.image_url,
        email: user.email_addresses[0].email_address,
        role,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error in checkUser:", error);
    throw error;
  }
};
