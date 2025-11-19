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
