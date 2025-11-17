import { getCharities } from "@/lib/db/charity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import CreateMembership from "./CreateMembership";
import { getUserIdFromClerkId } from "@/lib/db/user";
import { auth } from "@clerk/nextjs/server";
import Memberships from "./Memberships";
import { MembershipStatus } from "@prisma/client";
import UpdateCharityStatus from "./UpdateCharityStatus";

export default async function Charities({
    creatorId,
    status,
}: {
    creatorId?: string;
    status?: MembershipStatus;
}) {
    const charities = await getCharities(creatorId, status);
    const { userId: clerkUserId, sessionClaims } = await auth();
    const clerkUserRole = sessionClaims?.metadata?.role;
    const userId = await getUserIdFromClerkId(clerkUserId ?? undefined);
    return (
        <div className="w-full flex-col">
            {charities.map(({ id, creatorId, name, description, status, createdAt }) => (
                <Card key={id} className="w-full">
                    <CardHeader>
                        <CardTitle>Charity: {name}</CardTitle>
                        <CardDescription>Created: {createdAt.toDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{description}</CardDescription>
                        <CardDescription>
                            Status: {status.toLowerCase().replace("_", " ")}
                        </CardDescription>
                        {status == "ACTIVE" && userId != creatorId && (
                            <CreateMembership charityId={id} />
                        )}

                        {userId == creatorId && <div>*manage charity*</div>}
                        <div>Members: </div>
                        <Memberships status="ACTIVE" charityId={id} />
                        {clerkUserRole === "admin" && (
                            <UpdateCharityStatus charityId={id} status={status} />
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
