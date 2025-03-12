import { PrismaClient } from "@prisma/client";

// Menentukan tipe untuk globalThis agar TypeScript mengenali properti 'prisma'.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Menggunakan instance Prisma yang sudah ada, atau membuat instance baru jika belum ada.
export const db = globalForPrisma.prisma ?? new PrismaClient();

// Jika bukan dalam mode produksi, simpan instance Prisma di globalThis.
// Ini mencegah pembuatan banyak instance Prisma saat pengembangan dengan hot reload.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
