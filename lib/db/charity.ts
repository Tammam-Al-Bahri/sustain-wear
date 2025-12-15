import { prisma } from "@/lib/prisma";
import { CharityStatus } from "@prisma/client";
import { getMembership } from "./membership";

export async function createCharity(
    userId: string,
    name: string,
    description: string,
    address: string
) {
    return await prisma.charity.create({
        data: {
            creatorId: userId,
            name,
            description,
            address,
        },
    });
}

export async function listCharities(creatorId?: string, status?: CharityStatus) {
    return await prisma.charity.findMany({
        where: {
            creatorId,
            status,
        },
    });
}

export async function updateCharityStatus(charityId: string, status: CharityStatus) {
    return await prisma.charity.update({
        where: {
            id: charityId,
        },
        data: {
            status,
        },
    });
}

export async function isCharityCreatorOrStaff(userId: string, charityId?: string) {
    // specific charity
    if (charityId) {
        const charity = await prisma.charity.findUnique({
            where: { id: charityId },
        });

        if (charity?.creatorId === userId) return true;

        const membership = await getMembership(userId, charityId);
        return !!membership;
    }

    // any charity
    const creator = await prisma.charity.findFirst({
        where: { creatorId: userId },
        select: { id: true },
    });

    if (creator) return true;

    const membership = await prisma.membership.findFirst({
        where: { userId },
        select: { id: true },
    });

    return !!membership;
}
