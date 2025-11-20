"use client";

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Item } from "@prisma/client";

export default function ItemCard({
    item,
    currentUserId,
    selectable,
    selected,
    onSelect,
}: {
    item: Item;
    currentUserId: string | undefined;
    selectable?: boolean;
    selected?: boolean;
    onSelect?: (id: string) => void;
}) {
    const { id, userId, name, description, size, type, category, condition, status, createdAt } =
        item;

    return (
        <Card
            className={`w-full ${selectable && selected && "ring-2 ring-green-500"} ${
                selectable && "hover:scale-101 select-none"
            }`}
            onClick={() => {
                if (selectable && onSelect) onSelect(id);
            }}
        >
            <CardHeader>
                <CardTitle>Name: {name}</CardTitle>
                <CardDescription>Created: {createdAt.toDateString()}</CardDescription>
                <CardDescription>Status: {status.toLowerCase().replace("_", " ")}</CardDescription>
            </CardHeader>

            <CardContent>
                <CardDescription>Description: {description}</CardDescription>
                <CardDescription>Size: {size.replace("_", " ")}</CardDescription>
                <CardDescription>Type: {type.toLowerCase().replace("_", " ")}</CardDescription>
                <CardDescription>
                    Category: {category.toLowerCase().replace("_", " ")}
                </CardDescription>
                <CardDescription>
                    Condition: {condition.toLowerCase().replace("_", " ")}
                </CardDescription>
            </CardContent>
        </Card>
    );
}
