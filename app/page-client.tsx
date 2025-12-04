"use client"; 
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export          default function ClientPage() {
    class statCard {
        title: string
        stat: string
    }

    const stastics: statCard[] = 
    [
            {title: "Families helped this month", stat: "2,200"},
             {title: "Donators this month", stat: "15,000"},
                                    {title: "Redistributed items this month", stat: "32,00"},
                                    {title: "Items donated since we started", stat: "150K"},
                                    {title: "Diverted from landfill", stat: "85%"},
                                   ];
    
    return (
        <main>
            <div className="flex flex-col gap-[30px] h-[159px] w-full pt-14">
                <div className="flex flex-col gap-4">
                    <h1 className="text-[32px]/9 text-center font-medium text-[#274D22] "> Donate Your Clothes.<br /> <i className="font-extrabold"> Make an Impact.</i></h1>
                    <p className="text-[16px] text-center font-light text-[#237318]">
                        Every donation helps reduce waste and support sustainable fashion.<br/>
                        Join the SustainWear community today.
                    </p>
                </div>

                <div className="flex flex-row gap-7">
                    {stastics.map((statCard, index) => (
                        <Card
                         className="flex flex-col gap-2 items-center bg-[#E5F7E5] h-full max-w-[181px] px-[25px] py-5 
                                        shadow-[0px_4px_14px_rgba(0,0,0,0.15)] border border-white border-opacity-30 mx-auto"
                                        key={index}
                        >
                            <CardContent className="text-center flex flex-col align-center gap-2">
                                <p className="text-[24px] font-semibold text-[#4B6B4B]"> {statCard.stat}  </p>
                                <p className="text-center text-[16px] text-[#4B6B4B]"> {statCard.title} </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </div>
        </main>
    );
}

