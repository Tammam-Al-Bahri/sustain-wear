"use server";

import { createMembership } from "@/lib/db/membership";
import getCurrentUserIdAction from "./getCurrentUserId";

export async function createMembershipAction(charityId: string) {
    const { userId } = await getCurrentUserIdAction();
    if (!userId) return { error: "Not authenticated" };

    const membership = await createMembership(userId, charityId);
    if (!membership) return { error: "Could not request to join charity" };

    return { membership };
}
