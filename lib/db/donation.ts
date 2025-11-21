import { prisma } from "@/lib/prisma";

export async function createDonations(itemIds: string[], charityId: string) {
    return await prisma.donation.createMany({
        data: itemIds.map((itemId) => ({
            itemId,
            charityId,
        })),
    });
}
