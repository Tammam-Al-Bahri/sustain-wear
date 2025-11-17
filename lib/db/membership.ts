import { prisma } from "@/lib/prisma";

export async function createMembership(userId: string, charityId: string) {
    const charity = await prisma.charity.findFirst({
        where: {
            id: charityId,
        },
    });
    // if no charity found for some reason
    if (!charity) return null;
    // if charity creator is trying to join own charity
    if (charity.creatorId === userId) return null;
    // create membership
    return await prisma.membership.create({
        data: {
            userId,
            charityId,
        },
    });
}

export async function getMemberships(userId?: string, charityId?: string) {
    return await prisma.membership.findMany({
        where: {
            userId,
            charityId,
        },
        // include: {
        //     charity: true,
        // },
    });
}
