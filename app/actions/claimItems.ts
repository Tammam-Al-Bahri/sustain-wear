"use server";

import { createDonations } from "@/lib/db/donation";
import { updateItems } from "@/lib/db/item";

export default async function claimItemsAction(itemIds: string[], charityId: string) {
    if (!charityId || !itemIds.length) return;
    const items = await updateItems(itemIds, "CLAIMED");
    const donations = await createDonations(itemIds, charityId);
}
