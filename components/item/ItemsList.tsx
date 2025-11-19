import ItemCard from "./ItemCard";
import { Item } from "@prisma/client";

export default function ItemsList({
    items,
    currentUserId,
}: {
    items: Item[];
    currentUserId?: string | null;
}) {
    return (
        <div className="w-full flex-col">
            {items.map((item) => (
                <ItemCard key={item.id} item={item} currentUserId={currentUserId} />
            ))}
        </div>
    );
}
