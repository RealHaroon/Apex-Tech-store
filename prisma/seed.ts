import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    slug: "windows-11-genuine",
    name: "Windows 11 (Genuine)",
    description: "Licensed activation key with install support included.",
    category: "SOFTWARE" as const,
    icon: "software",
    price: 3500,
    priceNote: "+ setup",
    featured: true,
  },
  {
    slug: "ms-office-genuine",
    name: "MS Office (Genuine)",
    description: "Word, Excel, PowerPoint and more, student pricing available.",
    category: "SOFTWARE" as const,
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
    category: "SOFTWARE" as const,
    icon: "software",
    price: 4000,
    priceNote: "+ setup",
    featured: false,
  },
  {
    slug: "fast-charger",
    name: "Fast chargers",
    description: "18W & 20W USB-C chargers for phones and tablets.",
    category: "ACCESSORY" as const,
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
    category: "ACCESSORY" as const,
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
    category: "ACCESSORY" as const,
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
    category: "ACCESSORY" as const,
    icon: "powerbank",
    price: 2200,
    priceNote: null,
    startingPrice: true,
    featured: false,
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
