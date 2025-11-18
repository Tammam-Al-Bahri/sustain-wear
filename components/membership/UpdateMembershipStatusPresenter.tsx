"use client";

import { Button } from "@/components/ui/button";
import { MembershipStatus } from "@prisma/client";

export default function UpdateMembershipStatusPresenter({
    status,
    isPending,
    message,
    onClick,
}: {
    status: MembershipStatus;
    isPending: boolean;
    message: string;
    onClick: () => void;
}) {
    const isActive = status === "ACTIVE";

    return (
        <div>
            <Button
                onClick={onClick}
                disabled={isPending}
                variant={isActive ? "destructive" : "default"}
            >
                {isActive
                    ? isPending
                        ? "Revoking..."
                        : "Revoke Membership"
                    : isPending
                    ? "Approving..."
                    : "Approve"}
            </Button>

            {message && <p>{message}</p>}
        </div>
    );
}
