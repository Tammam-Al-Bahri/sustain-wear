"use client";

import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createItemAction } from "@/app/actions/createItem";
import { Combobox } from "@/components/combobox";
import { ItemCategory, ItemCondition, ItemSize, ItemType } from "@prisma/client";
import { Input } from "@/components/ui/input";

export default function CreateItemForm() {
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCondition, setSelectedCondition] = useState("");

    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState("");

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await createItemAction(
                formData,
                selectedSize as ItemSize,
                selectedType as ItemType,
                selectedCategory as ItemCategory,
                selectedCondition as ItemCondition
            );
            if (result?.error) setMessage(result.error);
            else setMessage("Created!");
        });
    }

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle>List New Item</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="flex flex-col gap-4">
                        <Input name="name" type="text" placeholder="Name" />
                        <Input name="description" type="text" placeholder="Description" />
                        <Combobox
                            label="Size*"
                            fields={[
                                { value: "XS", label: "XS" },
                                { value: "S", label: "S" },
                                { value: "M", label: "M" },
                                { value: "L", label: "L" },
                                { value: "XL", label: "XL" },
                                { value: "XXL", label: "XXL" },
                            ]}
                            value={selectedSize}
                            onValueChange={setSelectedSize}
                        />
                        <Combobox
                            label="Type*"
                            fields={[
                                { value: "SHIRT", label: "Shirt" },
                                { value: "TROUSERS", label: "Trousers" },
                                { value: "JACKET", label: "Jacket" },
                                { value: "SHOES", label: "Shoes" },
                                { value: "ACCESSORY", label: "Accessory" },
                            ]}
                            value={selectedType}
                            onValueChange={setSelectedType}
                        />
                        <Combobox
                            label="Category*"
                            fields={[
                                { value: "MENS", label: "Men" },
                                { value: "WOMENS", label: "Womens" },
                                { value: "UNISEX", label: "Unisex" },
                                { value: "KIDS", label: "Kids" },
                            ]}
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                        />
                        <Combobox
                            label="Condition*"
                            fields={[
                                { value: "NEW", label: "New" },
                                { value: "GOOD", label: "Good" },
                                { value: "FAIR", label: "Fair" },
                            ]}
                            value={selectedCondition}
                            onValueChange={setSelectedCondition}
                        />
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Creating..." : "Create"}
                        </Button>
                        {message && <p>{message}</p>}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
