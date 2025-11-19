"use server";

import { createCharity } from "@/lib/db/charity";
import getCurrentUserIdAction from "./getCurrentUserId";

export async function createCharityAction(formData: FormData) {
    const { userId } = await getCurrentUserIdAction();
    if (!userId) return { error: "Not authenticated" };

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!name || !description) {
        return { error: "Missing fields" };
    }
    const charity = await createCharity(userId, name, description);
    if (!charity) {
        return { error: "Could not create charity" };
    }
    return { charity };
}
