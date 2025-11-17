import { prisma } from "@/lib/prisma";
import { CharityStatus } from "@prisma/client";

export async function createCharity(userId: string, name: string, description: string) {
    return await prisma.charity.create({
        data: {
            creatorId: userId,
            name,
            description,
        },
    });
}

export async function getCharities(creatorId?: string, status?: CharityStatus) {
    return await prisma.charity.findMany({
        where: {
            creatorId,
            status,
        },
    });
}

export async function getCreatedCharitiesFromUserId(userId: string) {
    return await prisma.charity.findMany({
        where: {
            creatorId: userId,
        },
        include: {
            memberships: true,
        },
    });
}

export async function getCharityCreatorId(charityId: string) {
    return await prisma.charity.findUnique({
        where: {
            id: charityId,
        },
    });
}
