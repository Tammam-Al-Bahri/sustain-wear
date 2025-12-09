"use server";

import { createItem } from "@/lib/db/item";
import { ItemCategory, ItemCondition, ItemMaterial, ItemSize, ItemType } from "@prisma/client";
import getCurrentUserIdAction from "./getCurrentUserId";

export async function createItemAction(
    formData: FormData,
    imageUrls: string[],
    material: ItemMaterial,
    size: ItemSize,
    type: ItemType,
    category: ItemCategory,
    condition: ItemCondition
) {
    const { userId } = await getCurrentUserIdAction();
    if (!userId) return { error: "Not authenticated" };

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const mass = Number.parseFloat(formData.get("mass") as string);

    if (!name || !mass || !material || !size || !type || !category || !condition) {
        return { error: "Missing fields" };
    }

    const item = await createItem(
        userId,
        name,
        description,
        mass,
        material,
        size,
        type,
        category,
        condition,
        "LISTED",
        imageUrls
    );
    if (!item) return { error: "Could not create item" };
}
