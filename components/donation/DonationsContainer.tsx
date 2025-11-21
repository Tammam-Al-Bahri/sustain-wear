import DonationsList from "@/components/donation/DonationsList";
import { listDonations } from "@/lib/db/donation";
import { getUserIdFromClerkId } from "@/lib/db/user";
import { currentUser } from "@clerk/nextjs/server";

export default async function DonationsContainer({}: {}) {
    const clerkUserId = (await currentUser())?.id;
    const currentUserId = await getUserIdFromClerkId(clerkUserId ?? undefined);
    const donations = await listDonations();
    return <DonationsList donations={donations} currentUserId={currentUserId} />;
}
