import DonationCard from "./DonationCard";

export default function DonationsList({
    donations,
    currentUserId,
}: {
    donations: any[];
    currentUserId?: string;
}) {
    return (
        <div className="w-full flex-col">
            {donations.map((donation) => (
                <DonationCard key={donation.id} donation={donation} currentUserId={currentUserId} />
            ))}
        </div>
    );
}
