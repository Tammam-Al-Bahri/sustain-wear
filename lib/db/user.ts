import { prisma } from "@/lib/prisma";

export async function getUserIdFromClerkId(clerkId: string | undefined) {
    if (!clerkId) return undefined;
    return (
        await prisma.user.findUnique({
            where: {
                clerkId,
            },
            select: {
                id: true,
            },
        })
    )?.id;
}
