"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns, Donations } from "./columns";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";

type ApiDonation = {
  id?: string;
  charityId?: string;
  donorName?: string;
  itemId?: number | string;
  item?: number | string;
  createdAt?: string;
  date?: string;
  status?: string;
};

export default function CharityStaff() {
  const [data, setData] = useState<Donations[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Donations | null>(null);

  useEffect(() => {
    setLoading(true);
    async function load() {
      try {
        const res = await fetch(`/api/files/donations`);
        if (!res.ok) {
          throw new Error(`API error ${res.status}`);
        }
        const json = await res.json();

        const rows: ApiDonation[] = Array.isArray(json) ? json : json.donations;

        const mapped: Donations[] = rows.map((r: any) => ({
          id: String(r.id),
          donorName: r.donorName,
          item: Number(r.item),
          date: String(r.createdAt),
          status: r.status,
        }));

        setData(mapped);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error("fetch donations error:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const statistics = [
    { title: "Awaiting reviews pending donations", stat: "2,200" },
    { title: "Processed items approved today", stat: "15,000" },
    { title: "Total items in the inventory", stat: "3,200" },
    { title: "Items processed this month", stat: "150K" },
  ];

  return (
    <>
      <section className="flex justify-left w-full rounded-t-[15px] p-4 pb-[15px] pt-2.5 bg-linear-to-r from-[#C9EFC2] to-[#B7D5B2] shadow-[inset_0_-8px_0_0_rgba(58,150,46,0.2),inset_0_0_0_10px_rgba(255,255,255,0.15)] bg-clip-padding">
        <h2 className="text-[23px] font-extrabold text-[#274D22]">
          Charity Staff - Dashboard
        </h2>
      </section>

      <section className="p-4 w-full bg-white">
        <div className="flex flex-col p-4 gap-5 rounded-[15px] border-4 border-[rgba(196,255,188,0.5)]">
          <div className="flex w-full flex-row gap-[55px] justify-center h-[123px]">
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

          <div className="flex flex-col gap-2 ">
            <h1 className="font-bold text-[25px] w-full text-center">Donations Received</h1>

            <div className="border-4 border-b-0 border-r-0 overflow-clip border-solid rounded-[15px] bg-linear-to-b from-white to-[#EDFFEA]">
              {loading && (
                <div className="p-4 border-b-4 border-r-4">
                  Loading donations…
                </div>
              )}
              {!loading && (
                <DataTable
                  columns={columns}
                  data={data}
                  onRowClick={(row) => {
                    setSelected(row);
                    setOpen(true);
                  }}
                />
              )}
            </div>
          </div>

          <Dialog open={open} onOpenChange={setOpen} modal={false}>
            <DialogPortal>
              <div
                className="fixed inset-0 z-40 bg-black/50"
                onClick={() => setOpen(false)}
                aria-hidden="true"
              />
              <DialogContent className="border-3">
                <DialogHeader>
                  <DialogTitle>Donation details - Items</DialogTitle>
                </DialogHeader>
                {selected ? (
                  <div className="flex flex-col gap-2 p-4">
                    <div>
                      {(selected.item?.imageUrls ?? []).map((u: any) => (
                        <img key={u} src={u} className="h-20 w-20" />
                      ))}
                    </div>
                    <h3>{selected.item?.name}</h3>
                    <p>Charity: {selected.charity?.name}</p>
                    <p>{selected.status}</p>
                    {/* conditionally render DonationButton like above */}
                  </div>
                ) : (
                  <div>No donation selected.</div>
                )}
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>
      </section>
    </>
  );
}
