// components/memberships/MembershipsContainer.tsx

import { currentUser } from "@clerk/nextjs/server";
import { getUserIdFromClerkId } from "@/lib/db/user";
import { listMemberships } from "@/lib/db/membership";
import { MembershipStatus } from "@prisma/client";
import MembershipsList from "./MembershipsList";

export default async function MembershipsContainer({
    charityId,
    status,
}: {
    charityId?: string;
    status?: MembershipStatus;
}) {
    const clerkUser = await currentUser();
    const userId = await getUserIdFromClerkId(clerkUser?.id);

    const memberships = await listMemberships(charityId ? undefined : userId, charityId, status);

    if (!userId) return <div>Not authenticated</div>;

    return <MembershipsList memberships={memberships} currentUserId={userId} />;
}
