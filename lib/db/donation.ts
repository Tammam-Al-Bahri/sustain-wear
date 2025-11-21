import { prisma } from "@/lib/prisma";
import { DonationStatus } from "@prisma/client";

export async function createDonations(itemIds: string[], charityId: string) {
    return await prisma.donation.createMany({
        data: itemIds.map((itemId) => ({
            itemId,
            charityId,
        })),
    });
}

export async function listDonations(charityId?: string, status?: DonationStatus) {
    return await prisma.donation.findMany({
        where: {
            charityId,
            status,
        },
        include: {
            charity: true,
            item: true,
        },
    });
}

export async function updateDonation(donationId: string, status: DonationStatus) {
    return await prisma.donation.update({
        where: {
            id: donationId,
        },
        data: {
            status,
        },
    });
}
