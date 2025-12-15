import getCurrentUserIdAction from "@/app/actions/getCurrentUserId";
import { Button } from "@/components/ui/button";
// import { isCharityCreatorOrStaff } from "@/lib/db/charity";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function AdminHeaderButton() {
    const { userId } = await getCurrentUserIdAction();
    if (!userId) return null;
    // const isCharityStaff = await isCharityCreatorOrStaff(userId);
    // if (!isCharityStaff) return null;
    const user = await currentUser();
    if (user?.publicMetadata?.role !== "admin") return null;
    return (
        <Link href="/admin">
            <Button>Admin Dashboard</Button>
        </Link>
    );
}
