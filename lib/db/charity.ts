import { prisma } from "@/lib/prisma";
import { CharityStatus } from "@prisma/client";

export async function createCharity(clerkId: string, name: string, description: string) {
    const user = await prisma.user.findFirst({
        where: {
            clerkId,
        },
        select: {
            id: true,
        },
    });
    if (!user) return null; // if no user in db found from clerkId for some reason
    return await prisma.charity.create({
        data: {
            creatorId: user.id,
            name,
            description,
        },
    });
}

export async function getCharities(status?: CharityStatus) {
    return await prisma.charity.findMany({
        where: {
            status,
        },
    });
}
