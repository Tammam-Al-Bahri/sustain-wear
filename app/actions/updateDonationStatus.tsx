"use server";

import { updateDonation } from "@/lib/db/donation";
import { DonationStatus } from "@prisma/client";

export default async function updateDonationStatusAction(
    donationId: string,
    status: DonationStatus
) {
    const donation = await updateDonation(donationId, status);
    if (!donation) return { error: "Could not update donation status" };
    return { donation };
}
