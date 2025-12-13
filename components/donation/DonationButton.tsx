"use client";

import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { DonationStatus } from "@prisma/client";
import updateDonationStatusAction from "@/app/actions/updateDonationStatus";

export default function DonationButton({
    donationId,
    status,
}: {
    donationId: string;
    status: DonationStatus;
}) {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState("");

    function onSubmit() {
        startTransition(async () => {
            console.log(status);
            const nextStatus: DonationStatus =
                status === "PENDING" ? "SENT" : status === "SENT" ? "RECEIVED" : "RECEIVED";
            const result = await updateDonationStatusAction(donationId, nextStatus);
            if (!result) setMessage("error");
            // else setMessage("Status updated!");
        });
    }
    return (
        <Button onClick={onSubmit} type="submit" disabled={isPending} className="w-full">
            {status === "PENDING" && "Send"}
            {status === "SENT" && "Received"}
            {status === "RECEIVED"}
            {/* {message} */}
        </Button>
    );
}
