"use server";

import { prisma } from "@/lib/prisma";
import {
  transactionCreateSchema,
  transactionIdSchema,
  transactionUpdateSchema
} from "@/lib/validators/transaction";

export async function listTransactions() {
  return prisma.transaction.findMany({
    include: { category: true },
    orderBy: { date: "desc" }
  });
}

export async function getTransaction(id: string) {
  const { id: transactionId } = transactionIdSchema.parse({ id });

  return prisma.transaction.findUnique({
    where: { id: transactionId },
    include: { category: true }
  });
}

export async function createTransaction(input: unknown) {
  const data = transactionCreateSchema.parse(input);

  return prisma.transaction.create({
    data: {
      ...data,
      date: data.date ?? new Date()
    }
  });
}

export async function updateTransaction(input: unknown) {
  const { id, ...data } = transactionUpdateSchema.parse(input);

  return prisma.transaction.update({
    where: { id },
    data
  });
}

export async function deleteTransaction(id: string) {
  const { id: transactionId } = transactionIdSchema.parse({ id });

  return prisma.transaction.delete({
    where: { id: transactionId }
  });
}
