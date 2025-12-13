// /pages/api/donations-per-day.ts
import { prisma } from "@/lib/prisma";


export async function GET() {
  const donations = await prisma.donation.findMany();
  const counts: Record<string, number> = {};
  donations.forEach(d => {
    const date = d.createdAt.toISOString().split("T")[0];
    counts[date] = (counts[date] || 0) + 1;
    return Response.json(counts);
  })
};
