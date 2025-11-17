import { prisma } from "@/lib/prisma";

export async function createMembership(userId: string, charityId: string) {
    const charity = await prisma.charity.findFirst({
        where: {
            id: charityId,
        },
    });
    if (!charity) return null; // if no charity found for some reason

    // create membership
    return await prisma.membership.create({
        data: {
            userId,
            charityId,
        },
    });
}
