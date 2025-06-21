"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";

const schema = z.object({
  date: z.string().nonempty("Date is required"),
  time: z.string().nonempty("Time is required"),
});

type FormData = z.infer<typeof schema>;

export default function ReserveEquipmentPage() {
  const { id } = useParams() as { id: string };
  const { data: session } = useSession();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!session?.user?.id) {
      console.error("User not authenticated");
      return;
    }
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: session.user.id, equipmentId: id, ...data }),
    });
    if (response.ok) {
      router.push("/dashboard");
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
        <h1 className="text-2xl font-bold mb-4 text-center">Reserve Equipment</h1>
        <div className="space-y-4">
          <Input
            {...register("date")}
            type="date"
            className="w-full p-2 border rounded"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
          <Select {...register("time")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="09:00">09:00 AM</SelectItem>
              <SelectItem value="10:00">10:00 AM</SelectItem>
              <SelectItem value="11:00">11:00 AM</SelectItem>
            </SelectContent>
          </Select>
          {errors.time && (
            <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
          )}
          <Button type="submit" className="w-full bg-yellow-500 text-white p-2 rounded">
            Reserve Equipment
          </Button>
        </div>
      </form>
    </div>
  );
}