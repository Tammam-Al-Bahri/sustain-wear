"use server";

import { createCharity } from "@/lib/db/charity";
import getCurrentUserIdAction from "./getCurrentUserId";
import { currentUser } from "@clerk/nextjs/server";

export async function createCharityAction(formData: FormData) {
    const user = await currentUser();
    if (user?.publicMetadata?.role !== "admin" && user?.publicMetadata?.role !== "charity-staff")
        return { error: "Not authorized - you must be an admin or approved charity staff" };
    const { userId } = await getCurrentUserIdAction();
    if (!userId) return { error: "Not authenticated" };

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const address = formData.get("address") as string;

    if (!name || !description || !address) {
        return { error: "Missing fields" };
    }
    const charity = await createCharity(userId, name, description, address);
    if (!charity) {
        return { error: "Could not create charity" };
    }
    return { charity };
}
