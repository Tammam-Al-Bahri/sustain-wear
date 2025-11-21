import { listMemberships } from "@/lib/db/membership";

export default async function listCharitiesAction(userId?: string) {
    if (!userId) return [];
    const memberships = await listMemberships(userId, undefined, "ACTIVE");
    return memberships.map((m) => ({
        value: m.charity.id,
        label: m.charity.name,
    }));
}
