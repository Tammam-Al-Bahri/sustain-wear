"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns, Donations } from "./columns";
import { Card, CardContent } from "@/components/ui/card";
import { Combobox } from "@/components/combobox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Charity } from "@prisma/client";

type ApiDonation = {
    id?: string;
    charityId?: string;
    donorName?: string;
    itemId?: string;
    itemType?: string;
    createdAt?: string;
    date?: string;
    status?: string;
};

export default function CharityStaff() {
    const [donations, setDonations] = useState<Donations[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCharityId, setSelectedCharityId] = useState("");
    const [charities, setCharities] = useState<any[]>([]);
    const filteredDonations = selectedCharityId
        ? donations.filter((d) => d.charityId === selectedCharityId)
        : donations;

    useEffect(() => {
        console.log("selectedCharityId:", selectedCharityId);
        console.log(
            "donation charityIds:",
            donations.map((d) => d.charityId)
        );
    }, [selectedCharityId, donations]);

    useEffect(() => {
        setLoading(true);

        async function load() {
            try {
                const res = await fetch(`/api/files/donations`);
                if (!res.ok) {
                    throw new Error(`API error ${res.status}`);
                }
                const json = await res.json();
                console.log("donations fetched:", json);

                const rows: ApiDonation[] = Array.isArray(json) ? json : json.donations;

                const mapped: Donations[] = rows.map((r: any) => ({
                    id: String(r.id),
                    charityId: r.charityId,
                    donorName: r.item.user.name,
                    itemType: r.item.type,
                    size: r.item.size,
                    date: new Date(r.createdAt).toDateString(),
                    status: r.status,
                }));

                const charityItems = json.charities
                    .filter((c: Charity) => c.status === "ACTIVE")
                    .map((c: Charity) => ({
                        value: c.id,
                        label: c.name,
                    }));

                setDonations(mapped);
                setCharities(charityItems);
            } catch (err: any) {
                if (err.name === "AbortError") return;
                console.error("fetch donations error:", err);
                setDonations([]);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const pendingDonations = donations.filter((d) => d.status === "PENDING").length;

    const itemsClaimedToday = donations.filter((d) => {
        if (!d.date) return false;
        const dDate = new Date(d.date);
        dDate.setHours(0, 0, 0, 0);
        return d.status === "RECEIVED" && dDate.getTime() === today.getTime();
    }).length;

    const totalInventory = donations.filter((d) => d.status === "RECEIVED").length;

    const receivedThisMonth = donations.filter((d) => {
        if (!d.date) return false;
        const dDate = new Date(d.date);
        return d.status === "RECEIVED" && dDate >= startOfMonth;
    }).length;

    const statistics = [
        { title: "Pending donations", stat: pendingDonations.toString() },
        { title: "Items claimed today", stat: itemsClaimedToday.toString() },
        { title: "Total items in inventory", stat: totalInventory.toString() },
        { title: "Items received this month", stat: receivedThisMonth.toString() },
    ];

    return (
        <>
            <section className="flex justify-left w-full rounded-t-[15px] p-4 pb-[15px] pt-2.5 bg-linear-to-r from-[#C9EFC2] to-[#B7D5B2] shadow-[inset_0_-8px_0_0_rgba(58,150,46,0.2),inset_0_0_0_10px_rgba(255,255,255,0.15)] bg-clip-padding">
                <h2 className="text-[23px] font-extrabold text-[#274D22]">
                    Charity Staff - Dashboard
                </h2>
            </section>

            <div className="flex gap-2 w-full justify-center pt-8">
                <Link href="/charity-staff/choose-items">
                    <Button>Browse Listed Items</Button>
                </Link>
                <Link href="/charity-staff/your-charities">
                    <Button>Your Charities</Button>
                </Link>
            </div>

            <section className="p-4 w-full bg-white gap-[20px]">
                <div className="flex flex-col p-4 gap-5 rounded-[15px] border-4 border-[rgba(196,255,188,0.5)]">
                    <div className="flex w-full flex-col sm:flex-row gap-4 sm:gap-[55px] justify-center sm:h-[123px]">
                        {/* <div className="flex w-full flex-row gap-[55px] justify-center h-[123px]"> */}
                        {statistics.map((s) => (
                            <Card
                                key={s.title}
                                className="flex flex-col gap-2 justify-center bg-[#EDFFEA] h-full w-full rounded-[25px] px-[25px] py-5 border-4 border-[#83B47D] shadow-none"
                            >
                                <CardContent className="text-center flex flex-col gap-2 p-0">
                                    <p className="text-[14px] font-normal text-[#4B6B4B]">
                                        {s.title}
                                    </p>
                                    <p className="text-[17px] font-black text-[#3D533A]">
                                        {s.stat}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="flex flex-col gap-[20px]">
                        <Card className="flex flex-col gap-2 justify-center bg-[#EDFFEA] items-center sm:items-stretch w-full rounded-[25px] px-[13px] py-[8px] border-5 border-[#83B47D] shadow-none">
                            <Combobox
                                label="Charity*"
                                items={charities}
                                value={selectedCharityId}
                                onValueChange={setSelectedCharityId}
                                className="bg-[#CCEBC7] text-[#274D22] py-2 rounded-[10px] w-full sm:w-[171px]  min-h-[44px] px-3 border-3 border-[#83B47D]"
                                contentClassName="bg-[#CCEBC7] text-[#274D22] border-3 border-[#83B47D] w-full"
                                itemClassName="hover:bg-[#bfe3b3] w-full"
                            />
                        </Card>

                        <div className="border-4 border-b-0 border-r-0 overflow-clip border-solid rounded-[15px] bg-linear-to-b from-white to-[#EDFFEA]">
                            {loading && (
                                <div className="p-4 border-b-4 border-r-4">Loading donations…</div>
                            )}
                            {!loading && <DataTable columns={columns} data={filteredDonations} />}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
