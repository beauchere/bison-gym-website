import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      id: "test-uuid-123",
      name: "Test User",
      email: "test@example.com",
      passwordHash: "$2b$10$...hashed...", // Replace with actual bcrypt hash
      role: "member",
    },
  });
  console.log("Created user:", user);
  const users = await prisma.user.findMany();
  console.log("All users:", users);
}

main()
  .catch((e) => console.error("Error:", e))
  .finally(() => prisma.$disconnect());