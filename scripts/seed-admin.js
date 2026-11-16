/**
 * Admin Seeding / Password Reset Script
 * Usage: node scripts/seed-admin.js [email] [password]
 */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = (process.argv[2] || process.env.ADMIN_EMAIL || "admin@queenfineshii.com").trim().toLowerCase();
  const password = process.argv[3] || process.env.ADMIN_INITIAL_PASSWORD || "password123";

  console.log(`Setting up admin user: ${email}...`);

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
    },
    create: {
      email,
      name: "Admin",
      password: hashedPassword,
    },
  });

  console.log(`✅ Admin user configured successfully! ID: ${user.id}, Email: ${user.email}`);
}

main()
  .catch((e) => {
    console.error("Error setting up admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
