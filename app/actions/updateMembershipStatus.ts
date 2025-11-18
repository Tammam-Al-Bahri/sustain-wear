"use server";

import { auth } from "@clerk/nextjs/server";
import { MembershipStatus } from "@prisma/client";
import { updateMembershipStatus } from "@/lib/db/membership";
import { getUserIdFromClerkId } from "@/lib/db/user";

export default async function updateMembershipStatusAction(
    membershipId: string,
    status: MembershipStatus
) {
    const { userId: clerkUserId } = await auth();
    const userId = await getUserIdFromClerkId(clerkUserId ?? undefined);
    if (!userId) return { error: "Not authenticated" };

    const membership = await updateMembershipStatus(userId, membershipId, status);
    if (!membership) return { error: "Could not update membership status" };
    return { membership };
}
