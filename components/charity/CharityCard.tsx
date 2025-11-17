import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import CreateMembershipButton from "../membership/CreateMembershipButton";
import UpdateCharityStatus from "./UpdateCharityStatusButton";
import { Charity } from "@prisma/client";
import MembershipsContainer from "../membership/MembershipsContainer";
import { isMember } from "@/lib/db/membership";

export default async function CharityCard({
    charity,
    currentUserId,
    clerkRole,
}: {
    charity: Charity;
    currentUserId?: string | null;
    clerkRole?: string;
}) {
    const { id, name, description, status, createdAt, creatorId } = charity;

    const member = currentUserId ? await isMember(currentUserId, charity.id) : false;
    const isCreator = currentUserId === creatorId;
    const canJoin = status === "ACTIVE" && !isCreator && !member;
    const isAdmin = clerkRole === "admin";

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Charity: {name}</CardTitle>
                <CardDescription>Created: {createdAt.toDateString()}</CardDescription>
            </CardHeader>

            <CardContent>
                <CardDescription>{description}</CardDescription>
                <CardDescription>Status: {status.toLowerCase().replace("_", " ")}</CardDescription>

                {canJoin && <CreateMembershipButton charityId={id} />}

                {isCreator && (
                    <div>
                        Membership requests:
                        <MembershipsContainer charityId={id} status="PENDING_APPROVAL" />
                    </div>
                )}

                <div>Members:</div>
                <MembershipsContainer charityId={id} status="ACTIVE" />

                {isAdmin && (
                    <div>
                        Charity status: {status.toLowerCase().replace("_", " ")}
                        <UpdateCharityStatus charityId={id} status={status} />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
