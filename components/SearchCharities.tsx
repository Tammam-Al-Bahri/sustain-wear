import { getCharities } from "@/lib/db/charity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import JoinCharity from "./JoinCharity";
import { getIdFromClerkId } from "@/lib/db/user";
import { currentUser } from "@clerk/nextjs/server";
import SearchMemberships from "./SearchMemberships";

export default async function SearchCharities({ creatorId }: { creatorId?: string }) {
    const charities = await getCharities(creatorId);
    const clerkUser = await currentUser();
    const userId = await getIdFromClerkId(clerkUser?.id);
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
                        <SearchMemberships charityId={id} />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
