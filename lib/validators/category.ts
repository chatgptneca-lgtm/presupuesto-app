import { z } from "zod";
import { transactionTypeSchema } from "./transaction";

export const categoryCreateSchema = z.object({
  name: z.string().trim().min(1).max(100),
  type: transactionTypeSchema
});

export const categoryUpdateSchema = categoryCreateSchema.extend({
  id: z.string().cuid()
});

export const categoryIdSchema = z.object({
  id: z.string().cuid()
});

export const monthlyBudgetCreateSchema = z.object({
  categoryId: z.string().cuid(),
  amount: z.number().nonnegative(),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2000)
});

export const monthlyBudgetUpdateSchema = monthlyBudgetCreateSchema.extend({
  id: z.string().cuid()
});

export const monthlyBudgetIdSchema = z.object({
  id: z.string().cuid()
});
