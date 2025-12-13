import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getUserIdFromClerkId } from "@/lib/db/user";

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

    // Get the ID's of the charities user is a member of
    const memberships = await prisma.membership.findMany({
      where: { userId },
      select: { charityId: true },
    });

    const charityIds = memberships.map((m:any) => m.charityId);
    if (charityIds.length === 0) {
      return NextResponse.json({ donations: [] });
    }

    // Fetch donations for those charities
    const donations = await prisma.donation.findMany({
      where: { charityId: { in: charityIds } },
      include: {
        item: { include: { user: true } }, // donor info via item.user
        charity: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const mapped = donations.map((d:any) => ({
      id: d.id,
      itemId: d.itemId,
      charityId: d.charityId,
      status: d.status,
      createdAt: d.createdAt,
      donorName: d.item?.user?.name,
      donorEmail: d.item?.user?.email,
      items: {
        id: d.item?.id,
        name: d.item?.name,
        imageUrls: d.item?.imageUrls,
        userId: d.item?.userId,
      },
      charity: {
        id: d.charity?.id,
        name: d.charity?.name,
      },
    }));

    return NextResponse.json({ donations: mapped });
  } catch (err) {
    console.error("GET /api/files/donations error:", err);
    return NextResponse.json(
      { error: "Failed to load donations" },
      { status: 500 }
    );
  }
}
