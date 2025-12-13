import { prisma } from "@/lib/prisma";

export async function GET() {
    // get masses and materials of all sent items from donations
    const donations = await prisma.donation.findMany({
        where: { status: "SENT" },
        include: {
            item: {
                select: {
                    mass: true,
                    material: true,
                },
            },
        },
    });
    // calculate CO2 equivalent (CO2e)
    let total = 0;
    donations.forEach((donation) => {
        let mult;
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
    return Response.json({ total });
}
