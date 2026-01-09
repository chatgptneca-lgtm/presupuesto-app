"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import {
  categoryCreateSchema,
  categoryIdSchema,
  categoryUpdateSchema
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
  const data =
    input instanceof FormData
      ? {
          name: input.get("name"),
          type: input.get("type")
        }
      : input;
  const parsed = categoryCreateSchema.parse(data);

  const category = await prisma.category.create({
    data: parsed
  });

  revalidatePath("/categories");
  return category;
}

export async function updateCategory(input: unknown) {
  const data =
    input instanceof FormData
      ? {
          id: input.get("id"),
          name: input.get("name"),
          type: input.get("type")
        }
      : input;
  const { id, ...parsed } = categoryUpdateSchema.parse(data);

  const category = await prisma.category.update({
    where: { id },
    data: parsed
  });

  revalidatePath("/categories");
  return category;
}

export async function deleteCategory(input: unknown) {
  const data =
    input instanceof FormData
      ? {
          id: input.get("id")
        }
      : { id: input };
  const { id: categoryId } = categoryIdSchema.parse(data);

  await prisma.$transaction([
    prisma.monthlyBudget.deleteMany({ where: { categoryId } }),
    prisma.transaction.deleteMany({ where: { categoryId } }),
    prisma.category.delete({ where: { id: categoryId } })
  ]);

  revalidatePath("/categories");
}
