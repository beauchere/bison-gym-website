import { prisma } from "@/lib/prisma";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default async function TrainersPage() {
  const trainers = await prisma.trainer.findMany({
    orderBy: { name: "asc" },
  });
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Trainers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; specialization: any[]; }) => (
          <div
            key={trainer.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold">{trainer.name}</h2>
            <p className="text-gray-600 mt-2">
              Specializations: {trainer.specialization.join(", ")}
            </p>
            <a
              href={`/trainers/${trainer.id}/book`}
              className="mt-4 inline-block text-blue-500 hover:text-blue-700"
            >
              Book Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}