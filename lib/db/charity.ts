import { prisma } from "@/lib/prisma";

export async function CreateCharity(clerkId: string, name: string, description: string) {
    const user = await prisma.user.findFirst({
        where: {
            clerkId,
        },
        select: {
            id: true,
        },
    });
    if (!user) return null; // if no user in db found from clerkId for some reason
    return await prisma.charity.create({
        data: {
            creatorId: user.id,
            name,
            description,
        },
    });
}
