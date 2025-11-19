import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Item } from "@prisma/client";

export default async function ItemCard({
    item,
    currentUserId,
}: {
    item: Item;
    currentUserId?: string | null;
}) {
    const { id, userId, name, description, size, type, category, condition, status, createdAt } =
        item;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Item: {name}</CardTitle>
                <CardDescription>Created: {createdAt.toDateString()}</CardDescription>
            </CardHeader>

            <CardContent>
                <CardDescription>{description}</CardDescription>
                <CardDescription>Status: {status.toLowerCase().replace("_", " ")}</CardDescription>
            </CardContent>
        </Card>
    );
}
