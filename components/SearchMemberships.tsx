import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { getIdFromClerkId } from "@/lib/db/user";
import { currentUser } from "@clerk/nextjs/server";
import { getMemberships } from "@/lib/db/membership";

export default async function SearchMemberships({ charityId }: { charityId?: string }) {
    const clerkUser = await currentUser();
    const userId = await getIdFromClerkId(clerkUser?.id);
    // if you pass a charity id, you get all members of that charity
    // if you don't pass a charity id, you get all of your memberships
    const memberships = await getMemberships(charityId ? undefined : userId, charityId);
    return (
        <div className="w-full flex-col">
            {memberships.map(({ id, role, status, createdAt, updatedAt }) => (
                <Card key={id} className="w-full">
                    <CardHeader>
                        <CardDescription>Applied {createdAt.toDateString()}</CardDescription>
                        {status == "ACTIVE" && (
                            <CardDescription>Joined {updatedAt.toDateString()}</CardDescription>
                        )}
                    </CardHeader>
                    <CardContent>
                        <CardDescription>Role: {role}</CardDescription>
                        <CardDescription>Status: {status}</CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
