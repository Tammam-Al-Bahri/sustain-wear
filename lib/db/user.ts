import { prisma } from "@/lib/prisma";

export async function getIdFromClerkId(clerkId: string | undefined) {
    if (!clerkId) return undefined;
    return (
        await prisma.user.findFirst({
            where: {
                clerkId,
            },
            select: {
                id: true,
            },
        })
    )?.id;
}
