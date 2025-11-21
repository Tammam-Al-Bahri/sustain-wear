import ItemsList from "./ItemsList";
import { listItems } from "@/lib/db/item";
import { ItemCategory, ItemCondition, ItemSize, ItemStatus, ItemType } from "@prisma/client";
import SelectCharity from "@/components/charity/SelectCharity";
import { Button } from "@/components/ui/button";

export default async function ItemsContainer({
    currentUserId,
    userId,
    size,
    type,
    category,
    condition,
    status,
    selectable,
}: {
    currentUserId: string | undefined;
    userId?: string;
    size?: ItemSize;
    type?: ItemType;
    category?: ItemCategory;
    condition?: ItemCondition;
    status?: ItemStatus;
    selectable?: boolean;
}) {
    const items = await listItems(userId, size, type, category, condition, status);

    return (
        <div>
            <ItemsList currentUserId={currentUserId} items={items} selectable={selectable} />
            {selectable && currentUserId && <SelectCharity userId={currentUserId} />}
            {selectable && currentUserId && <Button>Claim</Button>}
        </div>
    );
}
