"use client";
import { DashCard } from "@/components/ui/dashcard";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import BarChart from "@/components/barchart";
import { useAccessibilitySync } from "@/components/useAccessibilitySync"; 

{/* logic to get the data from the database and display it on the cards */}
export default function ClientPage() {
    useAccessibilitySync(); 
  const { user } = useUser();

  const [donorCount, setDonorCount] = useState<number | null>(null);
  const [donationCounts, setDonationCounts] = useState<{
    total: number | null;
  }>({ total: null });
  const [charityCount, setCharityCount] = useState<number | null>(null);
  const [totalCO2, setTotalCO2] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCounts() {
      const donorRes = await fetch("/api/files/user-count");
      const donorData = await donorRes.json();
      setDonorCount(donorData.count);

      const res = await fetch("/api/files/items-count");
      const data = await res.json();
      setDonationCounts({ total: data.total });

      const charityRes = await fetch("/api/files/charity-count");
      const charityData = await charityRes.json();
      setCharityCount(charityData.count);

      const cO2Res = await fetch("/api/files/co2-emissions");
      const cO2Data = await cO2Res.json();
      setTotalCO2(cO2Data.total);
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
      <div className="flex flex-col p-4 gap-6">
        <div className="flex p-4 justify-center items-start">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <DashCard
              title="Total Donors"
              value={donorCount !== null ? String(donorCount) : "Loading..."}
            />
            <DashCard
              title="Total Donations"
              value={
                donationCounts.total !== null
                  ? String(donationCounts.total)
                  : "Loading..."
              }
            />
            <DashCard
              title="Total Collaborating Charities"
              value={
                charityCount !== null ? String(charityCount) : "Loading..."
              }
            />
            <DashCard
              title="Total CO₂ Emissions Saved"
              value={
                totalCO2 !== null ? String(totalCO2) + " kg CO₂" : "Loading..."
              }
            />
          </div>
        </div>
        {/* bar chart to show donations over time */}
        <div className="mx-auto p-4 flex flex-col">
          <BarChart />
        </div>
      </div>
    </main>
  );
}
