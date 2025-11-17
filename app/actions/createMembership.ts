"use server";

import { currentUser } from "@clerk/nextjs/server";
import { createMembership } from "@/lib/db/membership";

export async function createMembershipAction(charityId: string) {
    const user = await currentUser();
    if (!user) return { error: "Not authenticated" };

    const membership = await createMembership(user.id, charityId);
    if (!membership) return { error: "Could not request to join charity" };

    return { membership };
}
