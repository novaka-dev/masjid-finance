import { User } from "@prisma/client";

export const isAdmin = (user: User) => user.role === "ADMIN";
export const isUser = (user: User) => user.role === "USER";
