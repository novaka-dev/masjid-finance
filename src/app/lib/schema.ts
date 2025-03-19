import { z } from "zod";

// Definisikan schema
export const accountSchema = z.object({
  name: z.string().min(1, "Account name is required"),
  type: z.enum(["CURRENT", "SAVINGS"]), // Pastikan ini sesuai
  balance: z.string().min(1, "Initial balance is required"),
  isDefault: z.boolean(),
});

// Ekspor tipe `AccountFormValues`
export type AccountFormValues = z.infer<typeof accountSchema>;
