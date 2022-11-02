import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.createMany({
    data: [
      {
        name: "arts",
      },
      {
        name: "beauty",
      },
      { name: "business" },
      {
        name: "cars",
      },
      { name: "computers" },
      {
        name: "electronics",
      },
      {
        name: "dining",
      },
      {
        name: "education",
      },
      {
        name: "entertainment",
      },
      { name: "environment" },
      { name: "health" },
      { name: "news" },
      { name: "science" },
    ],
  });
  console.log(categories);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
