import { prisma } from "@/lib/prisma";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default async function NotificationsPage() {
  const notifications = await prisma.notification.findMany({
    where: { read: false },
    orderBy: { date: "desc" },
  });
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Notifications</h1>
      {notifications.length === 0 ? (
        <p className="text-center text-gray-500">No new notifications</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((n: { id: Key | null | undefined; message: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; date: string | number | Date; }) => (
            <div
              key={n.id}
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500"
            >
              <p className="text-gray-800">{n.message}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(n.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}