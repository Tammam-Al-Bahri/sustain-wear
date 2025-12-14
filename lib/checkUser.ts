import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const checkUser = async () => {
  try {
    const user = await currentUser();

    // No Clerk user
    if (!user || !user.id) {
      return null;
    }

        // check if user already in db
    const loggedInUser = await prisma.user.findUnique({
        where: { clerkId: user.id }
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    // if not in db, create new user
 const newUser = await prisma.user.upsert({
    where: { email: user.emailAddresses[0].emailAddress },
    update: {},
    create: {
        clerkId: user.id,
        name: `${user.firstName} ${user.lastName ?? ""}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
    },
});
    return newUser;
  } catch (error) {
    console.error("checkUser failed:", error);

    // Prevent page crash
    return null;
  }
};
