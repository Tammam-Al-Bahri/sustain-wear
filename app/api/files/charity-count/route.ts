import { prisma } from "@/lib/prisma";

export async function GET() {
    const count = await prisma.charity.count({ where: { status: "ACTIVE" } }); 
    return Response.json({ count });
} 