"use client";

import { useState, useTransition } from "react";
import { MembershipStatus } from "@prisma/client";
import updateMembershipStatusAction from "@/app/actions/updateMembershipStatus";
import UpdateMembershipStatusPresenter from "./UpdateMembershipStatusPresenter";

export default function UpdateMembershipStatusButton({
  membershipId,
  status,
}: {
  membershipId: string;
  status: MembershipStatus;
}) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  function onClick() {
    startTransition(async () => {
      const newStatus =
        status === "ACTIVE" ? "PENDING_APPROVAL" : "ACTIVE";

      const result = await updateMembershipStatusAction(
        membershipId,
        newStatus
      );

      if (result?.error) setMessage(result.error);
      else setMessage("Status updated");
    });
  }

  return (
    <UpdateMembershipStatusPresenter
      status={status}
      isPending={isPending}
      message={message}
      onClick={onClick}
    />
  );
}
