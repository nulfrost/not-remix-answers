import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Arts",
      },
      {
        name: "Beauty",
      },
      { name: "Business" },
      {
        name: "Cars",
      },
      { name: "Computers" },
      {
        name: "Electronics",
      },
      {
        name: "Dining",
      },
      {
        name: "Education",
      },
      {
        name: "Entertainment",
      },
      { name: "Environment" },
      { name: "Health" },
      { name: "News" },
      { name: "Science" },
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
