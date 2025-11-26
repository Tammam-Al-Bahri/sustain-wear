"use client";

import { useTransition, useState } from "react";
import { createCharityAction } from "@/app/actions/createCharity";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function CreateCharityForm() {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState("");

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        startTransition(async () => {
            const result = await createCharityAction(formData);
            if (result?.error) setMessage(result.error);
            else {
                form.reset();
                setMessage("Created!");
            }
        });
    }

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Create Charity</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="flex flex-col gap-4">
                        <Input name="name" type="text" placeholder="Name" />
                        <Input name="description" type="text" placeholder="Description" />
                        <Input name="address" type="text" placeholder="Address" />
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
