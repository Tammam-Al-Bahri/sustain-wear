// app/api/files/items-count/route.ts
import { prisma } from "@/lib/prisma";

export async function GET() {
  const count = await prisma.donation.count(); // assuming table is Donation
  return Response.json({ count });
}
