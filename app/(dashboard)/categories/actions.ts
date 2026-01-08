"use server";

import { prisma } from "@/lib/db";
import {
  categoryCreateSchema,
  categoryIdSchema,
  categoryUpdateSchema,
  monthlyBudgetCreateSchema,
  monthlyBudgetIdSchema,
  monthlyBudgetUpdateSchema
} from "@/lib/validators/category";

export async function listCategories() {
  return prisma.category.findMany({
    include: { monthlyBudgets: true },
    orderBy: { name: "asc" }
  });
}

export async function getCategory(id: string) {
  const { id: categoryId } = categoryIdSchema.parse({ id });

  return prisma.category.findUnique({
    where: { id: categoryId },
    include: { monthlyBudgets: true }
  });
}

export async function createCategory(input: unknown) {
  const data = categoryCreateSchema.parse(input);

  return prisma.category.create({
    data
  });
}

export async function updateCategory(input: unknown) {
  const { id, ...data } = categoryUpdateSchema.parse(input);

  return prisma.category.update({
    where: { id },
    data
  });
}

export async function deleteCategory(id: string) {
  const { id: categoryId } = categoryIdSchema.parse({ id });

  return prisma.category.delete({
    where: { id: categoryId }
  });
}

export async function createMonthlyBudget(input: unknown) {
  const data = monthlyBudgetCreateSchema.parse(input);

  return prisma.monthlyBudget.create({
    data
  });
}

export async function updateMonthlyBudget(input: unknown) {
  const { id, ...data } = monthlyBudgetUpdateSchema.parse(input);

  return prisma.monthlyBudget.update({
    where: { id },
    data
  });
}

export async function deleteMonthlyBudget(id: string) {
  const { id: budgetId } = monthlyBudgetIdSchema.parse({ id });

  return prisma.monthlyBudget.delete({
    where: { id: budgetId }
  });
}
