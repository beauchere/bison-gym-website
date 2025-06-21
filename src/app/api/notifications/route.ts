import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { messaging, getFirebaseToken } from "@/lib/firebase";

export async function POST(req: Request) {
  const { userId, message } = await req.json();
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        message,
        date: new Date(),
        read: false,
      },
    });
    const token = await getFirebaseToken(); // Assume user token is stored
    if (token) {
      // Send push notification via Firebase (implement FCM API call here)
      console.log("Push notification sent to:", token);
    }
    return NextResponse.json(notification);
  } catch (error) {
    console.error("Notification error:", error);
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 400 }
    );
  }
}