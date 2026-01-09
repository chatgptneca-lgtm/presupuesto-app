const { PrismaClient, TransactionType } = require("@prisma/client");

const prisma = new PrismaClient();

const sampleCategories = [
  { name: "Vivienda", type: TransactionType.EXPENSE },
  { name: "Transporte", type: TransactionType.EXPENSE },
  { name: "Alimentación", type: TransactionType.EXPENSE },
  { name: "Salario", type: TransactionType.INCOME }
];

async function main() {
  const count = await prisma.category.count();
  if (count > 0) {
    console.log("Seed omitido: ya existen categorías.");
    return;
  }

  await prisma.category.createMany({
    data: sampleCategories
  });

  console.log("Seed completado: categorías de ejemplo insertadas.");
}

main()
  .catch((error) => {
    console.error("Seed falló:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
