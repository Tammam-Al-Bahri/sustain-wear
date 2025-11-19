"use server";

import { getUserIdFromClerkId } from "@/lib/db/user";
import { currentUser } from "@clerk/nextjs/server";

export default async function getCurrentUserIdAction() {
    const user = await currentUser();
    if (!user) return { error: "Not authenticated" };
    const userId = await getUserIdFromClerkId(user.id);
    if (!userId) return { error: "Not authenticated" };

    return { userId };
}
