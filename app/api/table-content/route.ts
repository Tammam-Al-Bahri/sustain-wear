import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.item.findMany();
  return Response.json(items);
}
