"use client";
import { DashCard } from "@/components/ui/dashcard";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

{/* logic to get the data from the database and display it on the cards */}
export default function ClientPage() {
  const { user } = useUser();

  const [donorCount, setDonorCount] = useState<number | null>(null);
  const [donationCount, setDonationCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCounts() {
      const donorRes = await fetch("/api/files/user-count");
      const donorData = await donorRes.json();
      setDonorCount(donorData.count);

      const donationRes = await fetch("/api/files/items-count");
      const donationData = await donationRes.json();
      setDonationCount(donationData.count);
    }
    fetchCounts();
  }, []);

    return (
        <main>
            <div>
                {/* personalised welcome message for user */}
                <div className="w-screen flex justify-center">
                    <p id="welcome-message">Welcome, {user?.firstName}</p>
                </div>
                <br />
            </div>
            {/* shows data on cards for users to see */}
            <div className="h-dvh flex p-4 justify-center items-start">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    <DashCard
                        title="Total Donors"
                        value={donorCount !== null ? String(donorCount) : "Loading..."}
                    />
                    <DashCard
                        title="Total Donations"
                        value={donationCount !== null ? String(donationCount) : "Loading..."}
                    />
                    <DashCard 
                        title="Total Collaborating Charities" 
                        value={'100'} 
                    />
                </div>
            </div>
        </main>
    );
}