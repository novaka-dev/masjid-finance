import { z } from "zod";

// Definisikan schema
export const accountSchema = z.object({
  name: z.string().min(1, "Account name is required"),
  type: z.enum(["CURRENT", "SAVINGS"]), // Pastikan ini sesuai
  isDefault: z.boolean(),
});

export const transactionSchema = z.object({
  type: z.enum(["EXPENSE", "INCOME"]),
  amount: z.string().min(1, "Amount is required"),
  descriptions: z.string().optional(),
  date: z.date({
    required_error: "Date is required",
  }),
  accountId: z.string().min(1, "Account ID is required"),
  category: z.string().min(1, "Category is required"),
});

// Ekspor tipe `AccountFormValues`
export type AccountFormValues = z.infer<typeof accountSchema>;
export type TransactionFormValues = z.infer<typeof transactionSchema>;
