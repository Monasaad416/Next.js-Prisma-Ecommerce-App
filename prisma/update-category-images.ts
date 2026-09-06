import { prisma } from "../lib/prisma";

async function main() {
  await prisma.category.update({
    where: { slug: "chairs" },
    data: {
      image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1200&q=80",
    },
  });

  await prisma.category.update({
    where: { slug: "tables" },
    data: {
      image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=1200&q=80",
    },
  });

  await prisma.category.update({
    where: { slug: "sofas" },
    data: {
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
    },
  });

  console.log("Category images updated.");
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
