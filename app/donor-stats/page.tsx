"use client";
import { DashCard } from "@/components/ui/dashcard";
import { useEffect, useState } from "react";

export default function donorStats () {

    const [donationCounts, setDonationCounts] = useState<{userTotal: number | null;}>({userTotal: null,});

    useEffect(() => {
    async function fetchCounts() {
    const res = await fetch("/api/files/items-count");
    const data = await res.json();
    setDonationCounts({userTotal: data.userTotal});
  }
  fetchCounts();
}, []);


    return(
        <main>
            <div className="flex p-4 justify-center items-start text-2xl font-bold">
                <h1>Your Stats</h1>
            </div>
             <div className="flex p-4 justify-center items-start">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <DashCard
                            title="Total Donations"
                            value={donationCounts.userTotal !== null ? String(donationCounts.userTotal) : "Loading..."}
                        />
                        <DashCard
                            title="Total CO2 emmissions saved"
                            value={"coming soon"}
                        />
                    </div>
                </div>
        </main>
    )
}