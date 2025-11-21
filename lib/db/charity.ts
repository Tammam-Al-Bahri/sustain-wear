import { prisma } from "@/lib/prisma";
import { CharityStatus } from "@prisma/client";

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
