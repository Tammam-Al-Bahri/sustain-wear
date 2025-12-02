"use client";
import { DashCard } from "@/components/ui/dashcard";
import { useEffect, useState } from "react";


export default function ClientPage() {
      const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCount() {
      const res = await fetch("/api/files/user-count");
      const data = await res.json();
      setCount(data.count);
    }
    fetchCount();
  }, []);
    return (
        <main>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    <DashCard                        
                        title="Total Donors"
                        value={count !== null ? String(count) : "Loading..."}

                    />
                    <DashCard
                        title="Total Active Connections"
                        value={`$100`}
                    />
                    <DashCard 
                        title="Total Active Connections" 
                        value={`100`} 
                    />
                </div>
            </div>
        </main>
    );
}

