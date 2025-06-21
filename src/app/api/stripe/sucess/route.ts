import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(req: Request) {
  const { sessionId } = await req.json();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session.metadata) {
      throw new Error("Session metadata is missing.");
    }

    // Safely access metadata
    const userId = session.metadata.userId;
    const membershipId = session.metadata.membershipId;

    if (session.payment_status === "paid") {
      await prisma.payment.updateMany({
        where: { userId, status: "pending" },
        data: { status: "completed", transactionDate: new Date() },
      });

      await prisma.membership.update({
        where: { id: membershipId },
        data: { status: "active" },
      });
    }
    
interface CheckoutMetadata {
  userId: string;
  membershipId: string;
}

// Typecast when accessing metadata
const metadata = session.metadata as unknown as CheckoutMetadata;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Success verification error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
