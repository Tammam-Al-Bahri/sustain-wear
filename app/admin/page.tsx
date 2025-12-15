"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Admin() {
  return (
    <>
      <section className="flex justify-left w-full rounded-t-[15px] p-4 pb-[15px] pt-2.5 bg-linear-to-r from-[#C9EFC2] to-[#B7D5B2] shadow-[inset_0_-8px_0_0_rgba(58,150,46,0.2),inset_0_0_0_10px_rgba(255,255,255,0.15)] bg-clip-padding">
        <h2 className="text-[23px] font-extrabold text-[#274D22]">
          Admin Dashboard
        </h2>
      </section>
      <section className="flex flex-col p-6 w-full  gap-[20px]">
        <Card className="flex flex-col gap-4 bg-[#EDFFEA] rounded-[25px] px-[25px] py-6 border-4 border-[#83B47D] shadow-none">
          <CardContent className="flex flex-col gap-4 p-0">
            <p className="text-[16px] font-medium text-[#4B6B4B]">
              This is the protected admin dashboard restricted to users with the
              admin role.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Link href="/admin/set-user-role" className="flex-1">
                <Button className="w-full bg-[#254D28] hover:bg-[#1a3a1d] text-white py-6 rounded-[12px] text-[16px] font-semibold shadow-[0px_4px_14px_rgba(0,0,0,0.12)]">
                  Set User Permissions
                </Button>
              </Link>
              <Link href="/admin/approve-charities" className="flex-1">
                <Button className="w-full bg-[#254D28] hover:bg-[#1a3a1d] text-white py-6 rounded-[12px] text-[16px] font-semibold shadow-[0px_4px_14px_rgba(0,0,0,0.12)]">
                  Approve Charities
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
