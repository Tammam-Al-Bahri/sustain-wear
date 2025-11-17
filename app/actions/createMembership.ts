"use server";

import { currentUser } from "@clerk/nextjs/server";
import { createMembership } from "@/lib/db/membership";
import { getIdFromClerkId } from "@/lib/db/user";

export async function createMembershipAction(charityId: string) {
    const clerkUser = await currentUser();
    const userId = await getIdFromClerkId(clerkUser?.id);
    if (!userId) return { error: "Not authenticated" };

    const membership = await createMembership(userId, charityId);
    if (!membership) return { error: "Could not request to join charity" };

    return { membership };
}
