import { isAdminOrCreator } from "@/lib/db/membership";
import { Card, CardHeader, CardContent, CardDescription } from "../ui/card";
import UpdateMembershipStatusButton from "./UpdateMembershipStatusButton";

export default async function MembershipCard({
    membership,
    currentUserId,
}: {
    membership: any;
    currentUserId: string;
}) {
    const { id, role, status, createdAt, updatedAt, charity, user } = membership;
    const canManage = await isAdminOrCreator(currentUserId, id);
    return (
        <Card className="w-full">
            <CardHeader>
                <CardDescription>Applied {createdAt.toDateString()}</CardDescription>
                {status === "ACTIVE" && (
                    <CardDescription>Joined {updatedAt.toDateString()}</CardDescription>
                )}
            </CardHeader>

            <CardContent>
                <CardDescription>Charity: {charity.name}</CardDescription>
                <CardDescription>Member: {user.name}</CardDescription>
                <CardDescription>Role: {role.toLowerCase()}</CardDescription>

                <CardDescription>Status: {status.toLowerCase().replace("_", " ")}</CardDescription>

                {canManage && <UpdateMembershipStatusButton membershipId={id} status={status} />}
            </CardContent>
        </Card>
    );
}
