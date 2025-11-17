import { prisma } from "@/lib/prisma";
import { MembershipRole, MembershipStatus } from "@prisma/client";

export async function CreateMembership(
    userId: string,
    charityId: string,
    role: MembershipRole,
    status: MembershipStatus
) {
    return await prisma.membership.create({
        data: {
            userId,
            charityId,
            role,
            status,
        },
    });
}
