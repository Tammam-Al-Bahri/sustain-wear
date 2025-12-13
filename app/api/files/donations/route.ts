import { getUserIdFromClerkId } from "@/lib/db/user";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = await getUserIdFromClerkId(user.id);
    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // membership charities
    const memberships = await prisma.membership.findMany({
      where: { userId },
      include: { charity: true },
    });

    // creator charities (no membership)
    const createdCharities = await prisma.charity.findMany({
      where: { creatorId: userId },
    });

    // merge + dedupe charities
    const charityMap = new Map<string, any>();

    memberships.forEach(m => {
      charityMap.set(m.charity.id, m.charity);
    });

    createdCharities.forEach(c => {
      charityMap.set(c.id, c);
    });

    const charities = Array.from(charityMap.values());
    const charityIds = charities.map(c => c.id);

    if (charityIds.length === 0) {
      return NextResponse.json({ donations: [], charities: [] });
    }

    // fetch donations
    const donations = await prisma.donation.findMany({
      where: { charityId: { in: charityIds } },
      include: {
        item: { include: { user: true } },
        charity: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      donations,
      charities, // ← return charities directly
    });
  } catch (err) {
    console.error("GET /api/files/donations error:", err);
    return NextResponse.json(
      { error: "Failed to load donations" },
      { status: 500 }
    );
  }
}
