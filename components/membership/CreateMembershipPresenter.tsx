"use client";

import { Button } from "@/components/ui/button";

export default function CreateMembershipPresenter({
    isPending,
    message,
    onClick,
}: {
    isPending: boolean;
    message: string;
    onClick: () => void;
}) {
    return (
        <div>
            <Button onClick={onClick} disabled={isPending}>
                {isPending ? "Sending request..." : "Become a member"}
            </Button>
            {message && <p>{message}</p>}
        </div>
    );
}
