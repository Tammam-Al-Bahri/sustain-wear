import { auth } from "@clerk/nextjs/server";
import { getUserIdFromClerkId } from "@/lib/db/user";
import ItemsList from "./ItemsList";
import { listItems } from "@/lib/db/item";
import { ItemCategory, ItemCondition, ItemSize, ItemStatus, ItemType } from "@prisma/client";

export default async function ItemsContainer({
    creatorId,
    size,
    type,
    category,
    condition,
    status,
}: {
    creatorId?: string;
    size?: ItemSize;
    type?: ItemType;
    category?: ItemCategory;
    condition?: ItemCondition;
    status?: ItemStatus;
}) {
    const { userId: clerkUserId } = await auth();
    const userId = await getUserIdFromClerkId(clerkUserId ?? undefined);

    const items = await listItems(creatorId, size, type, category, condition, status);

    return (
        <div>
            <ItemsList items={items} currentUserId={userId} />
        </div>
    );
}
