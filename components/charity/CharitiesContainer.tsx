import { auth } from "@clerk/nextjs/server";
import { getUserIdFromClerkId } from "@/lib/db/user";
import { listCharities } from "@/lib/db/charity";
import CharitiesList from "./CharitiesList";
import { CharityStatus } from "@prisma/client";

export default async function CharitiesContainer({
    creatorId,
    status,
}: {
    creatorId?: string;
    status?: CharityStatus;
}) {
    const { userId: clerkUserId, sessionClaims } = await auth();
    const clerkRole = sessionClaims?.metadata?.role;
    const userId = await getUserIdFromClerkId(clerkUserId ?? undefined);

    const charities = await listCharities(creatorId, status);

    return <CharitiesList charities={charities} currentUserId={userId} clerkRole={clerkRole} />;
}
