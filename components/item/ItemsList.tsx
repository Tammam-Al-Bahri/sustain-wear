"use client";

import { useState } from "react";
import ItemCard from "./ItemCard";
import { Item } from "@prisma/client";

export default function ItemsList({
    items,
    currentUserId,
    selectable,
    onSelectionChange,
}: {
    items: Item[];
    currentUserId?: string;
    selectable?: boolean;
    onSelectionChange?: (ids: string[]) => void;
}) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    function toggleSelect(id: string) {
        if (!selectable) return;

        setSelectedIds((prev) => {
            const exists = prev.includes(id);
            const updated = exists ? prev.filter((x) => x !== id) : [...prev, id];
            onSelectionChange?.(updated);
            return updated;
        });
    }

    return (
        <div className="w-full flex-col">
            {items.map((item) => (
                <ItemCard
                    key={item.id}
                    item={item}
                    currentUserId={currentUserId}
                    selectable={selectable}
                    selected={selectedIds.includes(item.id)}
                    onSelect={toggleSelect}
                />
            ))}
        </div>
    );
}
