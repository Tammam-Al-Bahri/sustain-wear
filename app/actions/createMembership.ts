"use server";

import { createMembership } from "@/lib/db/membership";
import getCurrentUserIdAction from "./getCurrentUserId";
import { currentUser } from "@clerk/nextjs/server";

export async function createMembershipAction(charityId: string) {
    const { userId } = await getCurrentUserIdAction();
    if (!userId) return { error: "Not authenticated" };

    const user = await currentUser();
    if (user?.publicMetadata?.role !== "admin" && user?.publicMetadata?.role !== "charity-staff")
        return { error: "Not authorized - you must be an admin or approved charity staff" };

    const membership = await createMembership(userId, charityId);
    if (!membership) return { error: "Could not request to join charity" };

    return { membership };
}
