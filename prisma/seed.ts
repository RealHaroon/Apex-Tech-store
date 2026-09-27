import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { slug: "software", name: "Software licenses", position: 0 },
  { slug: "accessories", name: "Tech accessories", position: 1 },
];

const products = [
  {
    slug: "windows-11-genuine",
    name: "Windows 11 (Genuine)",
    description: "Licensed activation key with install support included.",
    categorySlug: "software",
    icon: "software",
    price: 3500,
    priceNote: "+ setup",
    featured: true,
  },
  {
    slug: "ms-office-genuine",
    name: "MS Office (Genuine)",
    description: "Word, Excel, PowerPoint and more, student pricing available.",
    categorySlug: "software",
    icon: "software",
    price: 2000,
    priceNote: "+ setup",
    featured: true,
  },
  {
    slug: "video-editor-license",
    name: "Video editor license",
    description:
      "Genuine license for popular editing software, plus a quick-start session.",
    categorySlug: "software",
    icon: "software",
    price: 4000,
    priceNote: "+ setup",
    featured: false,
  },
  {
    slug: "fast-charger",
    name: "Fast chargers",
    description: "18W & 20W USB-C chargers for phones and tablets.",
    categorySlug: "accessories",
    icon: "charger",
    price: 900,
    priceNote: null,
    startingPrice: true,
    featured: true,
  },
  {
    slug: "usb-cable",
    name: "Cables (USB-C, Lightning)",
    description: "Durable braided cables, 1m and 2m lengths.",
    categorySlug: "accessories",
    icon: "cable",
    price: 400,
    priceNote: null,
    startingPrice: true,
    featured: false,
  },
  {
    slug: "earphones",
    name: "Earphones",
    description: "Wired and budget wireless earphones with mic.",
    categorySlug: "accessories",
    icon: "earphones",
    price: 600,
    priceNote: null,
    startingPrice: true,
    featured: false,
  },
  {
    slug: "power-bank",
    name: "Power banks",
    description: "10,000mAh and 20,000mAh, dual-port fast charging.",
    categorySlug: "accessories",
    icon: "powerbank",
    price: 2200,
    priceNote: null,
    startingPrice: true,
    featured: false,
  },
];

async function main() {
  const categoryIds: Record<string, string> = {};
  for (const category of categories) {
    const row = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name, position: category.position },
      create: category,
    });
    categoryIds[category.slug] = row.id;
  }

  for (const { categorySlug, ...product } of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: { ...product, categoryId: categoryIds[categorySlug] },
      create: { ...product, categoryId: categoryIds[categorySlug] },
    });
  }
  console.log(`Seeded ${categories.length} categories and ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
