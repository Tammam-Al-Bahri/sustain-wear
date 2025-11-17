import { getCharities } from "@/lib/db/charity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import JoinCharity from "./JoinCharity";
import { getUserIdFromClerkId } from "@/lib/db/user";
import { currentUser } from "@clerk/nextjs/server";
import SearchMemberships from "./Memberships";

export default async function Charities({ creatorId }: { creatorId?: string }) {
    const charities = await getCharities(creatorId);
    const clerkUser = await currentUser();
    const userId = await getUserIdFromClerkId(clerkUser?.id);
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
                        {status == "ACTIVE" && userId != creatorId && (
                            <JoinCharity charityId={id} />
                        )}
                        {userId == creatorId && <div>*manage charity*</div>}
                        <div>Members: </div>
                        <SearchMemberships status="ACTIVE" charityId={id} />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
