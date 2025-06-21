import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, trainerId, equipmentId, date, time } = await req.json();
  try {
    const booking = await prisma.booking.create({
      data: {
        userId,
        trainerId: trainerId || null,
        equipmentId: equipmentId || null,
        date: new Date(date),
        time,
        status: "confirmed",
      },
    });
    // Optional: Trigger notification
    await prisma.notification.create({
      data: {
        userId,
        message: `Booking confirmed with ${trainerId ? "trainer" : "equipment"} on ${date} at ${time}`,
        date: new Date(),
        read: false,
      },
    });
    return NextResponse.json(booking);
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Failed to create booking, check availability or user permissions" },
      { status: 400 }
    );
  }
}