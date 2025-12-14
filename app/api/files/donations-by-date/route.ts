import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const donations = await prisma.donation.findMany({ select: { createdAt: true } });
    const counts: Record<string, number> = {};
    donations.forEach((d) => {
      const date = d.createdAt.toISOString().split("T")[0];
      counts[date] = (counts[date] || 0) + 1;
    });
    return NextResponse.json({ data: counts });
  } catch (err) {
    console.error("Error in donations-by-date route:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

