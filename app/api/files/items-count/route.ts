// app/api/files/items-count/route.ts
import { prisma } from "@/lib/prisma";

export async function GET() {
  const count = await prisma.donation.count(); 
  return Response.json({ count });
}

