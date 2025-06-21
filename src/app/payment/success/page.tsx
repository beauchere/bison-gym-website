"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();

  useEffect(() => {
    if (sessionId) {
      fetch("/api/stripe/success", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
        .then((res) => res.json())
        .then(() => router.push("/dashboard"))
        .catch((error) => console.error("Success verification error:", error));
    }
  }, [sessionId, router]);

  return <div className="min-h-screen flex items-center justify-center">Payment Successful! Redirecting...</div>;
}