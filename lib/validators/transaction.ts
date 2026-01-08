import { z } from "zod";

export const transactionTypeSchema = z.enum(["INCOME", "EXPENSE"]);

export const transactionCreateSchema = z.object({
  amount: z.number().positive(),
  type: transactionTypeSchema,
  date: z.coerce.date().optional(),
  description: z.string().trim().min(1).max(500).optional(),
  categoryId: z.string().cuid().optional()
});

export const transactionUpdateSchema = transactionCreateSchema.extend({
  id: z.string().cuid()
});

export const transactionIdSchema = z.object({
  id: z.string().cuid()
});
