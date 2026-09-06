import { hashPassword } from "../auth";
import { UserRole } from "../generated/prisma/enums";
import { prisma } from "../lib/prisma";

/** Product-only Unsplash shots (no people). */
const chairImages = [
  "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80",
  "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80",
  "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
  "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80",
  "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&q=80",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80",
];

const tableImages = [
  "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80",
  "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&q=80",
  "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
  "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
];

const sofaImages = [
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
  "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
  "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80",
  "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=80",
  "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
];

type SeedProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  description: string;
  images: string[];
  categoryId: string;
  isNew: boolean;
  createdAt: Date;
};

type SeedProductInput = Omit<SeedProduct, "id">;

function buildProducts(): SeedProduct[] {
  const chairs: SeedProductInput[] = [
    {
      name: "Ash Wood Dining Chair",
      slug: "ash-wood-dining-chair",
      price: 189.0,
      stock: 48,
      description: "Solid ash dining chair with a contoured seat and matte finish.",
      images: [chairImages[0], chairImages[3]],
      categoryId: "1",
      isNew: true,
      createdAt: new Date("2026-07-01"),
    },
    {
      name: "Velvet Accent Chair",
      slug: "velvet-accent-chair",
      price: 349.0,
      stock: 24,
      description: "Upholstered velvet accent chair on tapered wood legs.",
      images: [chairImages[1]],
      categoryId: "1",
      isNew: false,
      createdAt: new Date("2025-02-14"),
    },
    {
      name: "Minimal Lounge Chair",
      slug: "minimal-lounge-chair",
      price: 429.0,
      stock: 18,
      description: "Low lounge chair with a wide seat and supportive backrest.",
      images: [chairImages[2], chairImages[5]],
      categoryId: "1",
      isNew: true,
      createdAt: new Date("2026-08-11"),
    },
    {
      name: "Scandi Side Chair",
      slug: "scandi-side-chair",
      price: 149.0,
      stock: 72,
      description: "Light Scandinavian side chair that stacks when not in use.",
      images: [chairImages[3]],
      categoryId: "1",
      isNew: false,
      createdAt: new Date("2024-08-19"),
    },
    {
      name: "Woven Cord Armchair",
      slug: "woven-cord-armchair",
      price: 399.0,
      stock: 20,
      description: "Open-frame armchair with woven cord seating and a solid wood base.",
      images: [chairImages[4], chairImages[0]],
      categoryId: "1",
      isNew: true,
      createdAt: new Date("2026-05-05"),
    },
    {
      name: "Ergonomic Desk Chair",
      slug: "ergonomic-desk-chair",
      price: 279.0,
      stock: 55,
      description: "Adjustable desk chair with lumbar support and quiet casters.",
      images: [chairImages[5], chairImages[2]],
      categoryId: "1",
      isNew: false,
      createdAt: new Date("2023-11-22"),
    },
    {
      name: "Bentwood Cafe Chair",
      slug: "bentwood-cafe-chair",
      price: 129.0,
      stock: 90,
      description: "Classic bentwood cafe chair with a curved back.",
      images: [chairImages[0]],
      categoryId: "1",
      isNew: false,
      createdAt: new Date("2022-07-07"),
    },
    {
      name: "Boucle Reading Chair",
      slug: "boucle-reading-chair",
      price: 459.0,
      stock: 14,
      description: "Soft bouclé reading chair sized for corners and quiet nooks.",
      images: [chairImages[1], chairImages[6]],
      categoryId: "1",
      isNew: true,
      createdAt: new Date("2026-04-16"),
    },
    {
      name: "Counter Height Stool",
      slug: "counter-height-stool",
      price: 159.0,
      stock: 60,
      description: "Counter stool with a footrest rail and wipe-clean seat.",
      images: [chairImages[2]],
      categoryId: "1",
      isNew: true,
      createdAt: new Date("2026-06-28"),
    },
    {
      name: "Outdoor Stackable Chair",
      slug: "outdoor-stackable-chair",
      price: 89.0,
      stock: 120,
      description: "Weather-ready stackable chair for patios and balconies.",
      images: [chairImages[4]],
      categoryId: "1",
      isNew: false,
      createdAt: new Date("2025-12-01"),
    },
    {
      name: "Folding Guest Chair",
      slug: "folding-guest-chair",
      price: 79.0,
      stock: 140,
      description: "Space-saving folding chair with a padded seat for guests.",
      images: [chairImages[3], chairImages[4]],
      categoryId: "1",
      isNew: false,
      createdAt: new Date("2025-09-30"),
    },
    {
      name: "Leatherette Office Armchair",
      slug: "leatherette-office-armchair",
      price: 319.0,
      stock: 28,
      description: "Faux-leather office armchair with padded arms and tilt.",
      images: [chairImages[6], chairImages[5]],
      categoryId: "1",
      isNew: true,
      createdAt: new Date("2026-02-09"),
    },
  ];

  const tables: SeedProductInput[] = [
    {
      name: "Oak Dining Table (6-seat)",
      slug: "oak-dining-table-6-seat",
      price: 899.0,
      stock: 12,
      description: "Solid oak dining table for six with a natural grain finish.",
      images: [tableImages[0], tableImages[2]],
      categoryId: "2",
      isNew: true,
      createdAt: new Date("2026-07-18"),
    },
    {
      name: "Round Coffee Table",
      slug: "round-coffee-table",
      price: 249.0,
      stock: 36,
      description: "Low round coffee table with a smooth top and sturdy base.",
      images: [tableImages[1]],
      categoryId: "2",
      isNew: false,
      createdAt: new Date("2024-10-02"),
    },
    {
      name: "Walnut Writing Desk",
      slug: "walnut-writing-desk",
      price: 549.0,
      stock: 20,
      description: "Walnut desk with cable cutouts and a deep writing surface.",
      images: [tableImages[2], tableImages[5]],
      categoryId: "2",
      isNew: true,
      createdAt: new Date("2026-05-29"),
    },
    {
      name: "Entry Console Table",
      slug: "entry-console-table",
      price: 329.0,
      stock: 28,
      description: "Slim console for entryways and behind-sofa styling.",
      images: [tableImages[3]],
      categoryId: "2",
      isNew: false,
      createdAt: new Date("2025-04-11"),
    },
    {
      name: "Mid-Century Side Table",
      slug: "mid-century-side-table",
      price: 179.0,
      stock: 55,
      description: "Compact side table with tapered legs and warm wood tone.",
      images: [tableImages[4], tableImages[1]],
      categoryId: "2",
      isNew: true,
      createdAt: new Date("2026-06-03"),
    },
    {
      name: "Nesting Table Set (2)",
      slug: "nesting-table-set-2",
      price: 219.0,
      stock: 40,
      description: "Set of two nesting tables that tuck together to save space.",
      images: [tableImages[5]],
      categoryId: "2",
      isNew: false,
      createdAt: new Date("2023-08-15"),
    },
    {
      name: "Extendable Dining Table",
      slug: "extendable-dining-table",
      price: 1199.0,
      stock: 8,
      description: "Extendable dining table that grows from six to eight seats.",
      images: [tableImages[0], tableImages[3]],
      categoryId: "2",
      isNew: true,
      createdAt: new Date("2026-03-20"),
    },
    {
      name: "Marble-Look Accent Table",
      slug: "marble-look-accent-table",
      price: 269.0,
      stock: 30,
      description: "Accent table with a marble-look top and metal base.",
      images: [tableImages[1], tableImages[4]],
      categoryId: "2",
      isNew: false,
      createdAt: new Date("2024-01-26"),
    },
    {
      name: "Bedside Nightstand",
      slug: "bedside-nightstand",
      price: 199.0,
      stock: 50,
      description: "Nightstand with a soft-close drawer and open lower shelf.",
      images: [tableImages[5], tableImages[3]],
      categoryId: "2",
      isNew: true,
      createdAt: new Date("2026-08-08"),
    },
    {
      name: "Outdoor Patio Table",
      slug: "outdoor-patio-table",
      price: 379.0,
      stock: 22,
      description: "Weather-resistant patio table sized for four chairs.",
      images: [tableImages[4]],
      categoryId: "2",
      isNew: false,
      createdAt: new Date("2025-11-19"),
    },
    {
      name: "Ladder Shelf Desk",
      slug: "ladder-shelf-desk",
      price: 419.0,
      stock: 16,
      description: "Ladder-style desk with upper shelves for books and decor.",
      images: [tableImages[2], tableImages[0]],
      categoryId: "2",
      isNew: true,
      createdAt: new Date("2026-01-14"),
    },
    {
      name: "Folding Utility Table",
      slug: "folding-utility-table",
      price: 99.0,
      stock: 85,
      description: "Portable folding table for crafts, guests, or events.",
      images: [tableImages[2]],
      categoryId: "2",
      isNew: false,
      createdAt: new Date("2025-07-07"),
    },
  ];

  const sofas: SeedProductInput[] = [
    {
      name: "3-Seater Fabric Sofa",
      slug: "3-seater-fabric-sofa",
      price: 999.0,
      stock: 14,
      description: "Comfortable three-seater sofa with removable cushion covers.",
      images: [sofaImages[0], sofaImages[1]],
      categoryId: "3",
      isNew: true,
      createdAt: new Date("2026-07-12"),
    },
    {
      name: "Modular Sectional Sofa",
      slug: "modular-sectional-sofa",
      price: 1899.0,
      stock: 6,
      description: "L-shaped modular sectional with deep seats and firm cushions.",
      images: [sofaImages[1], sofaImages[5]],
      categoryId: "3",
      isNew: true,
      createdAt: new Date("2026-08-01"),
    },
    {
      name: "Compact 2-Seater Sofa",
      slug: "compact-2-seater-sofa",
      price: 749.0,
      stock: 20,
      description: "Apartment-friendly two-seater with a slim profile.",
      images: [sofaImages[2]],
      categoryId: "3",
      isNew: false,
      createdAt: new Date("2025-03-11"),
    },
    {
      name: "Chaise Lounge Sofa",
      slug: "chaise-lounge-sofa",
      price: 1299.0,
      stock: 10,
      description: "Sofa with an integrated chaise for stretched-out lounging.",
      images: [sofaImages[3], sofaImages[0]],
      categoryId: "3",
      isNew: true,
      createdAt: new Date("2026-05-22"),
    },
    {
      name: "Tufted Chesterfield Sofa",
      slug: "tufted-chesterfield-sofa",
      price: 1599.0,
      stock: 8,
      description: "Classic tufted chesterfield with rolled arms and deep buttons.",
      images: [sofaImages[4]],
      categoryId: "3",
      isNew: false,
      createdAt: new Date("2024-06-18"),
    },
    {
      name: "Sleeper Sofa Bed",
      slug: "sleeper-sofa-bed",
      price: 1149.0,
      stock: 12,
      description: "Pull-out sleeper sofa for guests without a spare bedroom.",
      images: [sofaImages[5], sofaImages[2]],
      categoryId: "3",
      isNew: true,
      createdAt: new Date("2026-06-14"),
    },
    {
      name: "Boucle Loveseat",
      slug: "boucle-loveseat",
      price: 879.0,
      stock: 16,
      description: "Soft bouclé loveseat for smaller living rooms.",
      images: [sofaImages[3]],
      categoryId: "3",
      isNew: false,
      createdAt: new Date("2025-01-17"),
    },
    {
      name: "Corner Storage Sofa",
      slug: "corner-storage-sofa",
      price: 1399.0,
      stock: 9,
      description: "Corner sofa with under-seat storage for blankets and throws.",
      images: [sofaImages[0], sofaImages[5]],
      categoryId: "3",
      isNew: false,
      createdAt: new Date("2023-09-09"),
    },
    {
      name: "Mid-Century Sofa",
      slug: "mid-century-sofa",
      price: 1099.0,
      stock: 11,
      description: "Mid-century style sofa with tapered legs and clean lines.",
      images: [sofaImages[1], sofaImages[4]],
      categoryId: "3",
      isNew: true,
      createdAt: new Date("2026-09-01"),
    },
    {
      name: "Recliner Sofa",
      slug: "recliner-sofa",
      price: 1499.0,
      stock: 7,
      description: "Power-recliner sofa with USB ports on both arms.",
      images: [sofaImages[5]],
      categoryId: "3",
      isNew: false,
      createdAt: new Date("2024-12-05"),
    },
    {
      name: "Daybed Sofa",
      slug: "daybed-sofa",
      price: 649.0,
      stock: 22,
      description: "Daybed-style sofa that works as seating or a nap spot.",
      images: [sofaImages[3], sofaImages[2]],
      categoryId: "3",
      isNew: true,
      createdAt: new Date("2026-03-11"),
    },
  ];

  return [...chairs, ...tables, ...sofas].map((product, index) => ({
    ...product,
    id: String(index + 1),
  }));
}

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  // Keep existing users so active sessions still work after reseed

  await prisma.category.createMany({
    data: [
      {
        id: "1",
        name: "chairs",
        slug: "chairs",
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1200&q=80",
        isTopCategory: true,
      },
      {
        id: "2",
        name: "tables",
        slug: "tables",
        image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=1200&q=80",
        isTopCategory: true,
      },
      {
        id: "3",
        name: "sofas",
        slug: "sofas",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
        isTopCategory: true,
      },
    ],
  });

  const products = buildProducts();
  await prisma.product.createMany({
    data: products,
  });

  const password = await hashPassword("12345678");
  const seedUsers = [
    {
      id: "1",
      name: "admin",
      email: "admin@test.com",
      role: UserRole.ADMIN,
      password,
    },
    {
      id: "2",
      name: "user1",
      email: "user1@test.com",
      role: UserRole.USER,
      password,
    },
    {
      id: "3",
      name: "user2",
      email: "user2@test.com",
      role: UserRole.USER,
      password,
    },
  ];

  for (const user of seedUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        role: user.role,
        password: user.password,
      },
      create: user,
    });
  }

  console.log(`Seeded ${products.length} furniture products (chairs, tables, sofas).`);
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
