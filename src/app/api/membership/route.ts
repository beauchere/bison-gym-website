import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, type } = await req.json();
  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 1); // 1-month membership
  try {
    const membership = await prisma.membership.create({
      data: {
        userId,
        type,
        status: "active",
        expiryDate,
      },
    });
    return NextResponse.json(membership);
  } catch (error) {
    console.error("Membership creation error:", error);
    return NextResponse.json(
      { error: "Failed to create membership, user may already have an active membership" },
      { status: 400 }
    );
  }
}