"use client";
import { DashCard } from "@/components/ui/dashcard";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import BarChart from "@/components/charts/DonationsBarChart";
import Link from "next/link";
import { Button } from "@/components/ui/button";

{
  /* logic to get the data from the database and display it on the cards */
}
export default function Donor() {
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
    <>
      <section className="flex justify-left w-full rounded-t-[15px] p-4 pb-[15px] pt-2.5 bg-linear-to-r from-[#C9EFC2] to-[#B7D5B2] shadow-[inset_0_-8px_0_0_rgba(58,150,46,0.2),inset_0_0_0_10px_rgba(255,255,255,0.15)] bg-clip-padding">
        <h2 className="text-[23px] font-extrabold text-[#274D22]">
          Welcome, {user?.firstName}
        </h2>
      </section>

      <section className="flex flex-col p-6 w-full bg-white gap-[20px]">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
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
        <div className="flex justify-center">
          <Link href="/donor/your-items">
            <Button className="bg-[#254D28] hover:bg-[#1a3a1d] text-white py-6 px-12 rounded-[12px] text-[16px] font-semibold shadow-[0px_4px_14px_rgba(0,0,0,0.12)]">
              List and Donate Items
            </Button>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="bg-[#EDFFEA] rounded-[25px] p-8 border-4 border-[#83B47D] shadow-none w-full max-w-4xl">
            <h3 className="text-[20px] font-bold text-[#274D22] text-center mb-6">
              Donation Activity
            </h3>
            <BarChart />
          </div>
        </div>
      </section>
    </>
  );
}
