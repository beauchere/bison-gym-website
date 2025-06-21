import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const revenue = await prisma.payment.aggregate({
    _sum: { amount: true },
    where: { status: "completed", transactionDate: { gte: new Date(new Date().setMonth(-1)) } },
  });
  const activeMembers = await prisma.membership.count({
    where: { status: "active" },
  });
  return NextResponse.json({
    totalRevenue: revenue._sum.amount || 0,
    activeMembers,
    reportDate: new Date().toISOString(),
  });
}