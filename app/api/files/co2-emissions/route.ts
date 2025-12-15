import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
    const { userId } = await auth();

    // calculate CO2e
    const calcCO2e = (donations: any[]) => {
        let total = 0;
        donations.forEach((donation) => {
            let mult = 0;
            switch (donation.item.material) {
                case "COTTON":
                    mult = 7;
                    break;
                case "WOOL":
                    mult = 30;
                    break;
                case "POLYESTER":
                    mult = 8;
                    break;
                case "LEATHER":
                    mult = 25;
                    break;
            }
            total += donation.item.mass * mult;
        });
        return total;
    };

    // total for all users
    const allDonations = await prisma.donation.findMany({
        where: { status: { in: ["SENT", "RECEIVED"] } },
        include: { item: { select: { mass: true, material: true } } },
    });
    const globalTotal = calcCO2e(allDonations);

    // per-user total
    let userTotal: number | null = null;
    if (userId) {
        const userDonations = await prisma.donation.findMany({
            where: {
                status: "SENT",
                item: {
                    userId: userId,
                },
            },
            include: { item: { select: { mass: true, material: true } } },
        });
        userTotal = calcCO2e(userDonations);
    }

    return Response.json({
        total: globalTotal,
        userTotal,
    });
}
