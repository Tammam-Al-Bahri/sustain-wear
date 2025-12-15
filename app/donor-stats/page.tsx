"use client";
import { DashCard } from "@/components/ui/dashcard";
import { useEffect, useState } from "react";
import DonationTable from "@/components/charts/DonationsTable";

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
        <>
            <section className="flex justify-left w-full rounded-t-[15px] p-4 pb-[15px] pt-2.5 bg-linear-to-r from-[#C9EFC2] to-[#B7D5B2] shadow-[inset_0_-8px_0_0_rgba(58,150,46,0.2),inset_0_0_0_10px_rgba(255,255,255,0.15)] bg-clip-padding">
                <h2 className="text-[23px] font-extrabold text-[#274D22]">
                    Your Donation Stats
                </h2>
            </section>
            <section className="flex flex-col p-6 w-full  gap-[20px]">
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-2xl">
                        <DashCard
                            title="Total Donations"
                            value={donationCounts.userTotal !== null ? String(donationCounts.userTotal) : "Loading..."}
                        />
                        <DashCard
                            title="Total CO₂ Emissions Saved"
                            value={userTotal !== null ? String(userTotal) + " kg CO₂" : "Loading..."}
                        />
                    </div>
                </div>
                <div className="bg-[#EDFFEA] rounded-[25px] p-6 border-4 border-[#83B47D] shadow-none">
                    <h3 className="text-[20px] font-bold text-[#274D22] mb-4">Donation History</h3>
                    <DonationTable />
                </div>
            </section>
        </>
    )
}