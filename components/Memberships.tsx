import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { getUserIdFromClerkId } from "@/lib/db/user";
import { currentUser } from "@clerk/nextjs/server";
import { getMemberships } from "@/lib/db/membership";
import { MembershipStatus } from "@prisma/client";

export default async function Memberships({
    charityId,
    status,
}: {
    charityId?: string;
    status?: MembershipStatus;
}) {
    const clerkUser = await currentUser();
    const userId = await getUserIdFromClerkId(clerkUser?.id);
    // if you pass a charity id to this component, you get all members of that charity
    // if you don't pass a charity id, you get all of your memberships
    const memberships = await getMemberships(charityId ? undefined : userId, charityId, status);
    return (
        <div className="w-full flex-col">
            {memberships.map(({ id, role, status, createdAt, updatedAt, charity, user }) => (
                <Card key={id} className="w-full">
                    <CardHeader>
                        <CardDescription>Applied {createdAt.toDateString()}</CardDescription>
                        {status == "ACTIVE" && (
                            <CardDescription>Joined {updatedAt.toDateString()}</CardDescription>
                        )}
                    </CardHeader>
                    <CardContent>
                        <CardDescription>Charity: {charity.name}</CardDescription>
                        <CardDescription>Member: {user.name}</CardDescription>
                        <CardDescription>Role: {role}</CardDescription>
                        <CardDescription>Status: {status}</CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
