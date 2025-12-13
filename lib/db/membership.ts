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
    // if membership already exists
    if (await getMembership(userId, charityId)) return null;
    // create membership
    return await prisma.membership.create({
        data: {
            userId,
            charityId,
        },
    });
}

export async function listMemberships(
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
                    id: true,
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

export async function getCharity(membershipId: string) {
    return await prisma.membership.findUnique({
        where: {
            id: membershipId,
        },
        select: {
            charity: true,
        },
    });
}

export async function isAdminOrCreator(userId: string, membershipId: string) {
    const charity = (await getCharity(membershipId))?.charity;
    if (!charity) return false;
    const role = (await getMembership(userId, charity.id))?.role;
    if (!role || role != "ADMIN") {
        const creatorId = charity.creatorId;
        if (creatorId != userId) return false;
    }
    return true;
}

export async function isCreator(userId: string, membershipId: string) {
    const charity = (await getCharity(membershipId))?.charity;
    if (!charity) return false;
    const creatorId = charity.creatorId;
    if (creatorId != userId) return false;
    return true;
}

export async function isMember(userId: string, charityId: string) {
    const membership = await getMembership(userId, charityId);
    return !!membership;
}

// charity creator and admins can change membership roles to pending or active
export async function updateMembershipStatus(
    userId: string,
    membershipId: string,
    status: MembershipStatus
) {
    const isAuthorised = await isAdminOrCreator(userId, membershipId);
    if (!isAuthorised) return null;
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
    const isAuthorised = await isCreator(userId, membershipId);
    if (!isAuthorised) return null;
    return await prisma.membership.update({
        where: {
            id: membershipId,
        },
        data: {
            role,
        },
    });
}
