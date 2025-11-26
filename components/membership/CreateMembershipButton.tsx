"use client";

import { useTransition, useState } from "react";
import { createMembershipAction } from "@/app/actions/createMembership";
import CreateMembershipPresenter from "./CreateMembershipPresenter";

export default function CreateMembershipButton({ charityId }: { charityId: string }) {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState("");

    function onClick() {
        startTransition(async () => {
            const result = await createMembershipAction(charityId);
            if (result?.error) setMessage(result.error);
            else setMessage("Request sent");
        });
    }

    return <CreateMembershipPresenter isPending={isPending} message={message} onClick={onClick} />;
}
