"use client";

import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createItemAction } from "@/app/actions/createItem";
import { Combobox } from "@/components/combobox";
import { ItemCategory, ItemCondition, ItemMaterial, ItemSize, ItemType } from "@prisma/client";
import { Input } from "@/components/ui/input";

export default function CreateItemForm() {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCondition, setSelectedCondition] = useState("");

    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState("");

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        startTransition(async () => {
            const result = await createItemAction(
                formData,
                imageUrls,
                selectedMaterial as ItemMaterial,
                selectedSize as ItemSize,
                selectedType as ItemType,
                selectedCategory as ItemCategory,
                selectedCondition as ItemCondition
            );
            if (result?.error) setMessage(result.error);
            else {
                setImageUrls([]);
                setSelectedMaterial("");
                setSelectedSize("");
                setSelectedType("");
                setSelectedCategory("");
                setSelectedCondition("");
                form.reset();
                setMessage("Created!");
            }
        });
    }

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle>List New Item</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        {imageUrls.map((url) => (
                            <img key={url} src={url} />
                        ))}
                    </div>

                    <form onSubmit={onSubmit} className="flex flex-col gap-4">
                        <CardDescription>
                            {isUploading ? "Uploading..." : "Upload images"}
                            <Input
                                type="file"
                                disabled={isUploading}
                                onChange={async (e) => {
                                    const file = e.target.files?.[0] as File;

                                    setIsUploading(true);

                                    const data = new FormData();
                                    data.set("file", file);
                                    const response = await fetch("/api/files", {
                                        method: "POST",
                                        body: data,
                                    });
                                    const { url } = await response.json();
                                    setImageUrls((prev) => [...prev, url]);
                                    setIsUploading(false);
                                }}
                            />
                        </CardDescription>
                        <Input name="name" type="text" placeholder="Name" />
                        <Input name="description" type="text" placeholder="Description" />
                        <Input
                            name="mass"
                            type="number"
                            placeholder="mass (kg)"
                            min={0}
                            step={0.01}
                        />
                        <Combobox
                            label="Material*"
                            items={[
                                { value: "COTTON", label: "Cotton" },
                                { value: "WOOL", label: "Wool" },
                                { value: "POLYESTER", label: "Polyester" },
                                { value: "LEATHER", label: "Leather" },
                            ]}
                            value={selectedMaterial}
                            onValueChange={setSelectedMaterial}
                        />
                        <Combobox
                            label="Size*"
                            items={[
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
                            items={[
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
                            items={[
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
                            items={[
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
