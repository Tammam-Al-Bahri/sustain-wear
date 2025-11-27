"use client";

import { Button } from "@/components/ui/button";
import { useItemsContext } from "./ItemsContext";
import claimItemsAction from "@/app/actions/claimItems";
import { useTransition } from "react";

export default function ClaimItemsButton() {
    const { selectedItemIds, selectedCharityId } = useItemsContext();
    const [isPending, startTransition] = useTransition();

    function onClick() {
        if (!selectedItemIds.length || !selectedCharityId) return;

        startTransition(() => {
            claimItemsAction(selectedItemIds, selectedCharityId);
        });
    }

    return (
        <Button onClick={onClick} disabled={isPending}>
            {isPending ? "Claiming..." : "Claim"}
        </Button>
    );
}
