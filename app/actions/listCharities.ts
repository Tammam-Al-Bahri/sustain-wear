"use server";

import { listCharities } from "@/lib/db/charity";
import { listMemberships } from "@/lib/db/membership";

export default async function listCharitiesAction(userId?: string) {
    if (!userId) return [];

    const memberships = await listMemberships(userId, undefined, "ACTIVE");
    const charities = await listCharities(userId, "ACTIVE");

    // Memberships mapped
    const membershipMapped = memberships.map((m) => ({
        value: m.charity.id,
        label: m.charity.name,
    }));

    // Charities mapped
    const charitiesMapped = charities.map((c) => ({
        value: c.id,
        label: c.name,
    }));

    // Merge and dedupe by value
    const merged = [...membershipMapped, ...charitiesMapped].filter(
        (item, index, arr) => arr.findIndex((i) => i.value === item.value) === index
    );

    return merged;
}
