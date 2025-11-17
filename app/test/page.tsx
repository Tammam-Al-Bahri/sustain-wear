import CreateCharity from "@/components/CreateCharity";
import Charities from "@/components/Charities";
import Memberships from "@/components/Memberships";
import { getUserIdFromClerkId } from "@/lib/db/user";
import { currentUser, auth } from "@clerk/nextjs/server";

export default async function Test() {
    const clerkUser = await currentUser();
    const userId = await getUserIdFromClerkId(clerkUser?.id);
    return (
        <div className="flex gap-4">
            <div className="flex-col w-full">
                <div className="text-2xl">Create Charity</div>
                <CreateCharity />
            </div>

            <div className="flex-col w-full">
                <div className="text-2xl">Your Charities</div>
                {/* charities you've created */}
                <Charities creatorId={userId} />
            </div>

            <div className="flex-col w-full">
                <div className="text-2xl">All Charities</div>
                <Charities />
                <div className="text">All Active</div>
                <Charities status="ACTIVE" />
            </div>

            <div className="flex-col w-full">
                <div className="text-2xl">Your Memberships</div>
                <div className="text">All your Memberships</div>
                <Memberships />
                <div className="text">Your Active Memberships</div>
                <Memberships status="ACTIVE" />
                <div className="text">Your Pending Memberships</div>
                <Memberships status="PENDING_APPROVAL" />
            </div>
        </div>
    );
}
