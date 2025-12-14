import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const checkUser = async () => {
  try {
    const user = await currentUser();

    // No Clerk user
    if (!user || !user.id) {
      return null;
    }

    // Check if user exists in DB
    const loggedInUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    // Create new user if not found
    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        imageUrl: user.imageUrl,
        email: user.emailAddresses?.[0]?.emailAddress ?? "",
      },
    });

    return newUser;
  } catch (error) {
    console.error("checkUser failed:", error);

    // Prevent page crash
    return null;
  }
};
