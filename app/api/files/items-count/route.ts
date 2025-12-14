import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  const totalDonations = await prisma.donation.count();

  let userDonations = null;;
  if (userId){
    userDonations = await prisma.donation.count({
      where: {
        item: {
          is: {
          userId: userId,
          },
        },
      },
    });
  }

  return Response.json({
      total: totalDonations,
      userTotal: userDonations,
    });
}

