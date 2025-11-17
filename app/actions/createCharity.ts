"use server";

import { currentUser } from "@clerk/nextjs/server";
import { createCharity } from "@/lib/db/charity";

export async function createCharityAction(formData: FormData) {
    const user = await currentUser();
    if (!user) return { error: "Not authenticated" };

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!name || !description) {
        return { error: "Missing fields" };
    }
    const charity = await createCharity(user.id, name, description);
    if (!charity) {
        return { error: "Could not create charity" };
    }
    return { charity };
}
