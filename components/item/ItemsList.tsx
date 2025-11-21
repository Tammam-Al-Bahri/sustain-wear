"use client";

import ItemCard from "./ItemCard";
import { Item } from "@prisma/client";
import { useItemsContext } from "./ItemsContext";

export default function ItemsList({
    items,
    currentUserId,
    selectable,
}: {
    items: Item[];
    currentUserId?: string;
    selectable?: boolean;
}) {
    const { selectedItemIds, setSelectedItemIds } = useItemsContext();

    function toggleSelect(id: string) {
        if (!selectable) return;

        setSelectedItemIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }

    return (
        <div className="w-full flex-col">
            {items.map((item: Item) => (
                <ItemCard
                    key={item.id}
                    item={item}
                    currentUserId={currentUserId}
                    selectable={selectable}
                    selected={selectedItemIds.includes(item.id)}
                    onSelect={toggleSelect}
                />
            ))}
        </div>
    );
}
