import CharitiesContainer from "@/components/charity/CharitiesContainer";

export default function ApproveCharities() {
    return (
        <div className="flex gap-4">
            <div className="flex-col w-full">
                <div className="text">Charities Pending Approval</div>
                <CharitiesContainer status="PENDING_APPROVAL" />
            </div>
            <div className="flex-col w-full">
                <div className="text">Active Charities</div>
                <CharitiesContainer status="ACTIVE" />
            </div>
        </div>
    );
}
