// app/page.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SustainWear",
  description: "SustainWear Home Page",
};

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
  {
    title: "Reduce fast fashion waste",
    stat: "Clothing donations keep usable textiles out of landfills and reduce pollution",
  },
  {
    title: "Support Local Communities",
    stat: "Every contribution directly helps families and charity partners in your community.",
  },
  {
    title: "Promote Sustainable Living",
    stat: "Donating extends the lifespan of clothing and encourages circular fashion",
  },
];

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-[30px] w-full pt-14 pb-7">
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

        <div className="flex flex-col gap-[47px] items-center w-full">
          <div className="w-full">
            <div className="marquee py-4">
              <div
                className="marquee-track gap-12!"
                style={{ animationDuration: "30s" }}
              >
                {statistics.map((s) => (
                  <Card
                    key={`a-${s.title}`}
                    className="flex-shrink-0 w-[220px] h-[120px] flex flex-col gap-5 justify-center bg-[#E5F7E5] border-none px-4 py-3 shadow-[0px_4px_14px_rgba(0,0,0,0.12)] border border-white border-opacity-30 overflow-hidden"
                  >
                    <CardContent className="text-center h-full flex flex-col justify-center gap-2 p-0">
                      <p className="text-[18px] sm:text-[20px] font-semibold text-[#4B6B4B] truncate">
                        {s.stat}
                      </p>
                      <p className="text-[13px] sm:text-[14px] text-[#4B6B4B] truncate">
                        {s.title}
                      </p>
                    </CardContent>
                  </Card>
                ))}
                {statistics.map((s) => (
                  <Card
                    key={`a-${s.title}`}
                    className="flex-shrink-0 w-[220px] h-[120px] flex flex-col gap-2 justify-center bg-[#E5F7E5] border-none px-4 py-3 shadow-[0px_4px_14px_rgba(0,0,0,0.12)] border border-white border-opacity-30 overflow-hidden"
                  >
                    <CardContent className="text-center h-full flex flex-col justify-center gap-2 p-0">
                      <p className="text-[18px] sm:text-[20px] font-semibold text-[#4B6B4B] truncate">
                        {s.stat}
                      </p>
                      <p className="text-[13px] sm:text-[14px] text-[#4B6B4B] truncate">
                        {s.title}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <Link href="/sign-in">
            <Button className=" click py-[23px] w-[300px] rounded-[15px] bg-[#254D28] shadow-[0px_0px_0px_4px_rgba(37,77,40,0.1)] border- text-[#E5F7E5] text-[20px] font-bold">
              Start Donating
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-6 items-center w-full">
          <p className="text-[20px] sm:text-[24px] text-center font-semibold text-[#274D22]">
            Why SustainWear Matters?
          </p>

          <div className="flex flex-col md:flex-row gap-[30px] md:gap-[63px] justify-center px-10 pb-10 md:px-40 ">
            {reasons.map((r) => (
              <Card
                key={r.title}
                className="flex flex-col justify-center bg-[#E5F7E5] border-none h-full w-full max-w-full sm:max-w-full 
                px-[25px] py-5 shadow-[0px_4px_14px_rgba(0,0,0,0.25)] border border-white border-opacity-30"
              >
                <CardContent className="text-center flex flex-col gap-[25px] p-0">
                  <p className="text-[18px] sm:text-[20px] text-[#4B6B4B] font-semibold">
                    {r.title}
                  </p>
                  <p className="text-[14px] text-[#4B6B4B]">{r.stat}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
