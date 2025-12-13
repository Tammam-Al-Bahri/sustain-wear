import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const checkUser = async () => {
    const user = await currentUser();

    // check for current logged in clerk user
    if (!user) {
        return null;
    }

        // check if user already in db
    const loggedInUser = await prisma.user.findUnique({
        where: { clerkId: user.id }
    });

    // if user in db, return user
    if (loggedInUser) {
        return loggedInUser;
    }

    // if not in db, create new user
    const newUser = await prisma.user.create({
        data: {
            clerkId: user.id,
            name: `${user.firstName} ${user.lastName ?? ""}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
        },
    });

    return newUser;
};
