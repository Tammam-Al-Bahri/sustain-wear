"use client";

import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { createMembershipAction } from "@/app/actions/createMembership";

export default function JoinCharity({ charityId }: { charityId: string }) {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState("");

    function onSubmit() {
        startTransition(async () => {
            const result = await createMembershipAction(charityId);
            if (result?.error) setMessage(result.error);
            else setMessage("Created!");
        });
    }

    return (
        <div>
            <Button onClick={onSubmit} type="submit" disabled={isPending}>
                {isPending ? "Sending request" : "Become a member"}
            </Button>
            {message && <p>{message}</p>}
        </div>
    );
}
