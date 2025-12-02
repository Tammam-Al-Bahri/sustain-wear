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

export async function listDonations(charityId?: string, userId?: string, status?: DonationStatus) {
    if (userId) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                items: {
                    include: {
                        donation: {
                            include: {
                                charity: true,
                                item: true,
                            },
                        },
                    },
                },
            },
        });
        if (!user) return [];
        const donations = user.items
            .map((item) => item.donation)
            .filter((d) => {
                if (!d) return false;
                if (status) return d.status === status;
                return true;
            });
        return donations;
    }
    const donations = await prisma.donation.findMany({
        where: {
            charityId,
            status,
        },
        include: {
            charity: true,
            item: true,
        },
    });
    return donations;
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
