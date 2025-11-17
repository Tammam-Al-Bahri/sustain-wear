import { prisma } from "@/lib/prisma";
import { MembershipRole, MembershipStatus } from "@prisma/client";

export async function createMembership(userId: string, charityId: string) {
    const charity = await prisma.charity.findUnique({
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

export async function getMemberships(
    userId?: string,
    charityId?: string,
    status?: MembershipStatus
) {
    return await prisma.membership.findMany({
        where: {
            userId,
            charityId,
            status,
        },
        // get the name of charity and member
        include: {
            charity: {
                select: {
                    name: true,
                },
            },
            user: {
                select: {
                    name: true,
                },
            },
        },
    });
}

export async function getMembership(userId: string, charityId: string) {
    return await prisma.membership.findUnique({
        where: {
            userId_charityId: { userId, charityId },
        },
    });
}

export async function getCharityIdFromMemberId(memberId: string) {
    return (
        await prisma.membership.findFirst({
            where: {
                userId: memberId,
            },
            select: {
                charityId: true,
            },
        })
    )?.charityId;
}

// charity creator and admins can change membership roles to pending or active
export async function updateMembershipStatus(
    userId: string,
    membershipId: string,
    status: MembershipStatus
) {
    const charityId = await getCharityIdFromMemberId(userId);
    if (!charityId) return null;
    const role = (await getMembership(userId, charityId))?.role;
    if (role != "ADMIN") return null;
    if (!role) {
        const creatorId = await getCharityIdFromMemberId(userId);
        if (creatorId != userId) return null;
    }

    return prisma.membership.update({
        where: {
            id: membershipId,
        },
        data: {
            status,
        },
    });
}

// only creator can change member roles
export async function updateMembershipRole(
    userId: string,
    membershipId: string,
    role: MembershipRole
) {
    const creatorId = await getCharityIdFromMemberId(userId);
    if (creatorId != userId) return null;
    return await prisma.membership.update({
        where: {
            id: membershipId,
        },
        data: {
            role,
        },
    });
}
