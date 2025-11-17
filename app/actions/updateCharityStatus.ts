"use server";

import { auth } from "@clerk/nextjs/server";
import { updateCharityStatus } from "@/lib/db/charity";
import { CharityStatus } from "@prisma/client";

export default async function updateCharityStatusAction(charityId: string, status: CharityStatus) {
    const { userId: clerkUserId, sessionClaims } = await auth();
    const clerkUserRole = sessionClaims?.metadata?.role;

    // only clerk users with session role = admin
    if (clerkUserRole !== "admin") return { error: "Not authorised" };
    const charity = await updateCharityStatus(charityId, status);
    return { charity };
}
