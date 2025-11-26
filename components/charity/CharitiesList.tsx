import CharityCard from "./CharityCard";
import { Charity } from "@prisma/client";

export default function CharitiesList({
    charities,
    currentUserId,
    clerkRole,
}: {
    charities: Charity[];
    currentUserId?: string | null;
    clerkRole?: string;
}) {
    return (
        <div className="w-full flex-col">
            {charities.map((charity) => (
                <CharityCard
                    key={charity.id}
                    charity={charity}
                    currentUserId={currentUserId}
                    clerkRole={clerkRole}
                />
            ))}
        </div>
    );
}
