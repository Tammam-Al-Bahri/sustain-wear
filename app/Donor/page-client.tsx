"use client";
import { DashCard } from "@/components/ui/dashcard";
import { useEffect, useState } from "react";
import { currentUser } from "@clerk/nextjs/server";


export default async function ClientPage() {
      const user = await currentUser();
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
            <div>
                <div className="w-screen flex justify-center">
                    <p id="welcome-message">Welcome, {user?.firstName}</p>
                </div>    
            </div>
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

