"use server";

import { MembershipStatus } from "@prisma/client";
import { updateMembershipStatus } from "@/lib/db/membership";
import getCurrentUserIdAction from "./getCurrentUserId";

export default async function updateMembershipStatusAction(
    membershipId: string,
    status: MembershipStatus
) {
    const { userId } = await getCurrentUserIdAction();
    if (!userId) return { error: "Not authenticated" };

    const membership = await updateMembershipStatus(userId, membershipId, status);
    if (!membership) return { error: "Could not update membership status" };
    return { membership };
}
