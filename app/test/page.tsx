import CreateCharity from "@/components/CreateCharity";
import SearchCharities from "@/components/SearchCharities";
import SearchMemberships from "@/components/SearchMemberships";
import { getIdFromClerkId } from "@/lib/db/user";
import { currentUser } from "@clerk/nextjs/server";

export default async function Test() {
    const clerkUser = await currentUser();
    const userId = await getIdFromClerkId(clerkUser?.id);
    return (
        <div className="flex gap-4">
            <CreateCharity />

            {/* charities you've created */}
            <SearchCharities creatorId={userId} />

            {/* all charities */}
            <SearchCharities />

            {/* all your memberships */}
            <SearchMemberships />
        </div>
    );
}
