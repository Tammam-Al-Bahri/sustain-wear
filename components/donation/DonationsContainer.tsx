import DonationsList from "@/components/donation/DonationsList";
import { listDonations } from "@/lib/db/donation";
import { getUserIdFromClerkId } from "@/lib/db/user";
import { currentUser } from "@clerk/nextjs/server";
import { DonationStatus } from "@prisma/client";

export default async function DonationsContainer({
    charityId,
    userId,
    status,
}: {
    charityId?: string;
    userId?: string;
    status?: DonationStatus;
}) {
    const clerkUserId = (await currentUser())?.id;
    const currentUserId = await getUserIdFromClerkId(clerkUserId ?? undefined);
    const donations = await listDonations(charityId, userId, status);
    return <DonationsList donations={donations} currentUserId={currentUserId} />;
}
