import { useEffect, useState } from "react";
import ProfileTabsLayout from "@/components/ProfileTabsLayout";
import { apiFetch } from "@/lib/api/core/client";

export default function SalesPage() {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/api/users/me/sales")
      .then((res) => {
        if (!res.ok || !res.data) throw new Error(res.error?.message || "Failed to fetch sales.");
        setSales(res.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ProfileTabsLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Sales History</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : sales.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sales.map((item) => (
              <li
                key={item.id}
                className="border rounded shadow-sm p-4 bg-white"
              >
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h2 className="text-lg font-semibold truncate">{item.title}</h2>
                <p className="text-gray-700">₩{item.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">Status: {item.status}</p>
                {item.soldAt && (
                  <p className="text-sm text-gray-400">Sold At: {item.soldAt}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No sales history available.</p>
        )}
      </div>
    </ProfileTabsLayout>
  );
}
