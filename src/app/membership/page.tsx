"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const schema = z.object({
  type: z.enum(["basic", "premium"], {
    errorMap: () => ({ message: "Select a membership type" }),
  }),
});

type FormData = z.infer<typeof schema>;

export default function MembershipPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: "basic" },
  });

  const onSubmit = async (data: FormData) => {
    if (!session?.user?.id) {
      console.error("User not authenticated");
      return;
    }
    const response = await fetch("/api/membership", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: session.user.id, ...data }),
    });
    if (response.ok) {
      router.push("/payment");
    } else {
      const error = await response.json();
      console.error(error.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Membership</h1>
        <div className="space-y-4">
          <Select {...register("type")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Membership Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic - $50/month</SelectItem>
              <SelectItem value="premium">Premium - $100/month</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
          <Button type="submit" className="w-full bg-purple-500 text-white p-2 rounded">
            Purchase Membership
          </Button>
        </div>
      </form>
    </div>
  );
}