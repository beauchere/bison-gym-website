"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PaymentPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.id) {
      router.push("/login");
      return;
    }
    fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.user.id,
        amount: 50.00, // Example amount
        membershipId: "membership-001",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          window.location.href = data.url;
        }
      })
      .catch((error) => console.error("Payment fetch error:", error));
  }, [session, router]);

  return <div className="min-h-screen flex items-center justify-center">Redirecting to payment...</div>;
}