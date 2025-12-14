"use client";
import { DashCard } from "@/components/ui/dashcard";
import { useEffect, useState } from "react";

export default function donorStats () {

    const [donationCounts, setDonationCounts] = useState<{userTotal: number | null;}>({userTotal: null,});
    const [userTotal, setTotalCO2] = useState<number | null>(null);

    useEffect(() => {
        async function fetchCounts() {
        const res = await fetch("/api/files/items-count");
        const data = await res.json();
        setDonationCounts({userTotal: data.userTotal});

        const cO2Res = await fetch("/api/files/co2-emissions");
        const cO2Data = await cO2Res.json();
        setTotalCO2(cO2Data.userTotal);

  }
  fetchCounts();
}, []);


    return(
        <main>
            <div className="flex p-4 justify-center items-start text-2xl font-bold">
                <h1>Your Stats</h1>
            </div>
            <div className="w-dvh flex flex-col p-4 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <DashCard
                        title="Total Donations"
                        value={donationCounts.userTotal !== null ? String(donationCounts.userTotal) : "Loading..."}
                    />
                    <DashCard
                        title="Total CO2 emmissions saved"
                        value={userTotal !== null ? String(userTotal) + " kg CO₂" : "Loading..."}
                    />
                </div>
            </div>
        </main>
    )
}