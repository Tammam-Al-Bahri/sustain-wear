"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";

interface Card {
  title: string;
  stat: string;
}

const statistics: Card[] = [
  { title: "Families helped this month", stat: "2,200" },
  { title: "Donators this month", stat: "15,000" },
  { title: "Redistributed items this month", stat: "3,200" },
  { title: "Items donated since we started", stat: "150K" },
  { title: "Diverted from landfill", stat: "85%" },
];

const reasons: Card[] = [
  { title: "Reduce fast fashion waste", stat: "Clothing donations keep usable textiles out of landfills and reduce pollution" },
  { title: "Support Local Communities", stat: "Every contribution directly helps families and charity partners in your community." },
  { title: "Promote Sustainable Living", stat: "Donating extends the lifespan of clothing and encourages circular fashion" }
]

export default function ClientPage() {
  return (
    <main>
      <div className="flex flex-col gap-[30px] h-100vh  w-full pt-14 pb-7">
        <div className="flex flex-col gap-4">
          <h1 className="text-[32px]/9 text-center font-medium text-[#274D22]">
            Donate Your Clothes.
            <br />
            <i className="font-extrabold"> Make an Impact.</i>
          </h1>
          <p className="text-[16px] text-center font-light text-[#237318]">
            Every donation helps reduce waste and support sustainable fashion.
            <br />
            Join the SustainWear community today.
          </p>
        </div>

        <div className="flex flex-col gap-[47px] items-center">
          <div className="flex flex-row gap-7 justify-center h-[159px]">
            {statistics.map((s) => (
              <Card
                key={s.title}
                className="flex flex-col gap-2 justify-center bg-[#E5F7E5] border-none h-full max-w-[181px] px-[25px] py-5 shadow-[0px_4px_14px_rgba(0,0,0,0.25)] border border-white border-opacity-30"
              >
                <CardContent className="text-center flex flex-col  gap-2 p-0">
                  <p className="text-[24px] font-semibold text-[#4B6B4B]">
                    {s.stat}
                  </p>
                  <p className="text-[16px] text-[#4B6B4B]">{s.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <SignUpButton>
            <Button className="h-full click py-3 w-[300px] rounded-[15px] bg-[#254D28] shadow-[0px_0px_0px_4px_rgba(37,77,40,0.1)] border- text-[#E5F7E5] text-[20px] font-bold">
              Start Donating
            </Button>
          </SignUpButton>
        </div>

        <div className="flex flex-col gap-6 items-center">
          <p  className="text-[24px] text-center font-semibold text-[#274D22]">
            Why SustainWear Matters?
          </p>

          <div className="flex flex-row gap-[63px] justify-center ">
            {reasons.map((r) => ( 
              <Card
                key={r.title}
                className="flex flex-col  justify-center bg-[#E5F7E5] border-none h-full max-w-[279px] px-[25px] py-5 shadow-[0px_4px_14px_rgba(0,0,0,0.25)] border border-white border-opacity-30">
                <CardContent className="text-center flex flex-col  gap-[25px] p-0">
                  <p className="text-[20px] text-[#4B6B4B] font-semibold">{r.title}</p>
                  <p className="text-[14px] text-[#4B6B4B]">{r.stat}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
