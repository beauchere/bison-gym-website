import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();
  try {
    const passwordHash = bcrypt.hashSync(password, 10); // Salt rounds: 10
    const user = await prisma.user.create({
      data: {
        id: crypto.randomUUID(), // Fallback if uuid-ossp not working
        name,
        email,
        passwordHash,
        role,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Email already exists or server error" }, { status: 400 });
  }
}