"use client";

import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import updateCharityStatusAction from "@/app/actions/updateCharityStatus";
import { CharityStatus } from "@prisma/client";

export default function UpdateCharityStatusButton({
    charityId,
    status,
}: {
    charityId: string;
    status: CharityStatus;
}) {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState("");

    function onSubmit() {
        startTransition(async () => {
            const result = await updateCharityStatusAction(
                charityId,
                status === "ACTIVE" ? "PENDING_APPROVAL" : "ACTIVE"
            );
            if (result?.error) setMessage(result.error);
            else setMessage("Status updated!");
        });
    }
    return (
        <div>
            <Button
                onClick={onSubmit}
                type="submit"
                disabled={isPending}
                variant={status === "ACTIVE" ? "destructive" : "default"}
            >
                {status === "ACTIVE"
                    ? isPending
                        ? "Revoking..."
                        : "Revoke Approval"
                    : isPending
                    ? "Approving"
                    : "Approve"}
            </Button>
            {message && <p>{message}</p>}
        </div>
    );
}
