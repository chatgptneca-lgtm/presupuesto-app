"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import {
  monthlyBudgetIdSchema,
  monthlyBudgetListSchema,
  monthlyBudgetUpsertSchema
} from "@/lib/validators/category";

export async function listBudgets(month: number, year: number) {
  const { month: parsedMonth, year: parsedYear } =
    monthlyBudgetListSchema.parse({ month, year });

  return prisma.category.findMany({
    include: {
      monthlyBudgets: {
        where: { month: parsedMonth, year: parsedYear }
      }
    },
    orderBy: { name: "asc" }
  });
}

export async function upsertMonthlyBudget(input: unknown) {
  const data =
    input instanceof FormData
      ? {
          categoryId: input.get("categoryId"),
          amount: input.get("amount"),
          month: input.get("month"),
          year: input.get("year")
        }
      : input;
  const parsed = monthlyBudgetUpsertSchema.parse(data);

  const budget = await prisma.monthlyBudget.upsert({
    where: {
      categoryId_month_year: {
        categoryId: parsed.categoryId,
        month: parsed.month,
        year: parsed.year
      }
    },
    update: { amount: parsed.amount },
    create: parsed
  });

  revalidatePath("/budgets");
  return budget;
}

export async function deleteMonthlyBudget(input: unknown) {
  const data =
    input instanceof FormData
      ? {
          id: input.get("id")
        }
      : { id: input };
  const { id: budgetId } = monthlyBudgetIdSchema.parse(data);

  const budget = await prisma.monthlyBudget.delete({
    where: { id: budgetId }
  });

  revalidatePath("/budgets");
  return budget;
}
