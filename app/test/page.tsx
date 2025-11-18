import CreateCharityForm from "@/components/charity/CreateCharityForm";
import { getUserIdFromClerkId } from "@/lib/db/user";
import { currentUser } from "@clerk/nextjs/server";
import CharitiesContainer from "@/components/charity/CharitiesContainer";
import MembershipsContainer from "@/components/membership/MembershipsContainer";

export default async function Test() {
    const clerkUser = await currentUser();
    const userId = await getUserIdFromClerkId(clerkUser?.id);
    return (
        <div className="flex gap-4">
            <div className="flex-col w-full">
                <div className="text-2xl">Create Charity</div>
                <CreateCharityForm />
            </div>

            <div className="flex-col w-full">
                <div className="text-2xl">Your Charities</div>
                {/* charities you've created */}
                <CharitiesContainer creatorId={userId} />
            </div>

            <div className="flex-col w-full">
                <div className="text-2xl">All Charities</div>
                <CharitiesContainer />
                <div className="text">All Active</div>
                <CharitiesContainer status="ACTIVE" />
            </div>

            <div className="flex-col w-full">
                <div className="text-2xl">Your Memberships</div>
                <div className="text">All your Memberships</div>
                <MembershipsContainer />
                <div className="text">Your Active Memberships</div>
                <MembershipsContainer status="ACTIVE" />
                <div className="text">Your Pending Memberships</div>
                <MembershipsContainer status="PENDING_APPROVAL" />
            </div>
        </div>
    );
}
