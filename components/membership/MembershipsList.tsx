import MembershipCard from "./MembershipCard";

export default function MembershipsList({
    memberships,
    currentUserId,
}: {
    memberships: any[];
    currentUserId: string;
}) {
    return (
        <div className="w-full flex-col">
            {memberships.map((m) => (
                <MembershipCard key={m.id} membership={m} currentUserId={currentUserId} />
            ))}
        </div>
    );
}
