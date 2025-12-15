import getCurrentUserIdAction from "@/app/actions/getCurrentUserId";
import CharitiesContainer from "@/components/charity/CharitiesContainer";
import MembershipsContainer from "@/components/membership/MembershipsContainer";

export default async function YourCharities() {
    const { userId } = await getCurrentUserIdAction();
    return (
        <div className="flex gap-4">
            <div className="flex-col w-full">
                <div className="text-2xl">Your Charities</div>
                {/* charities you've created */}
                <CharitiesContainer creatorId={userId} />
            </div>
            <div className="flex-col w-full">
                <div className="text-2xl">Joined Charities (Memberships)</div>
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
