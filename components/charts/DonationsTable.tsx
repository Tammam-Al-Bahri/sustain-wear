"use client";
import { useEffect, useState } from "react";

type Item = {
  id: string;
  imageUrls: string[];
  name: string;
  description?: string;
  mass: number;
  material: string;
  size: string;
  type: string;
  category: string;
  condition: string;
  status: string;
  createdAt: string;
};

export default function ItemsTable() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch("/api/files/table-content");
      const data = await res.json();
      setItems(data);
    }
    fetchItems();
  }, []);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Mass</th>
            <th className="border p-2">Material</th>
            <th className="border p-2">Size</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Condition</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={11} className="text-center p-4">
                No items found
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">
                  {item.imageUrls.length > 0 ? (
                    <img
                      src={item.imageUrls[0]}
                      alt={item.name}
                      className="h-16 w-16 object-cover"
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.description || "-"}</td>
                <td className="border p-2">{item.mass}</td>
                <td className="border p-2">{item.material}</td>
                <td className="border p-2">{item.size}</td>
                <td className="border p-2">{item.type}</td>
                <td className="border p-2">{item.category}</td>
                <td className="border p-2">{item.condition}</td>
                <td className="border p-2">{item.status}</td>
                <td className="border p-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
