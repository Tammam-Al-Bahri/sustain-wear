import { ItemCategory, ItemCondition, ItemSize, ItemStatus, ItemType } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function createItem(
    userId: string,
    name: string,
    description: string,
    size: ItemSize,
    type: ItemType,
    category: ItemCategory,
    condition: ItemCondition,
    status: ItemStatus
) {
    return await prisma.item.create({
        data: {
            userId,
            name,
            description,
            size,
            type,
            category,
            condition,
            status,
        },
    });
}

export async function listItems(
    userId?: string,
    size?: ItemSize,
    type?: ItemType,
    category?: ItemCategory,
    condition?: ItemCondition,
    status?: ItemStatus
) {
    return await prisma.item.findMany({
        where: {
            userId,
            size,
            type,
            category,
            condition,
            status,
        },
    });
}

export async function updateItem(
    id: string,
    size?: ItemSize,
    type?: ItemType,
    category?: ItemCategory,
    condition?: ItemCondition,
    status?: ItemStatus
) {
    return await prisma.item.update({
        where: {
            id,
        },
        data: {
            size,
            type,
            category,
            condition,
            status,
        },
    });
}

export async function updateItems(itemIds: string[], status: ItemStatus) {
    return await prisma.item.updateMany({
        where: { id: { in: itemIds } },
        data: {
            status,
        },
    });
}
