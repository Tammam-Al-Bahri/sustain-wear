import getCurrentUserIdAction from "@/app/actions/getCurrentUserId";
import { Button } from "@/components/ui/button";
import { isCharityCreatorOrStaff } from "@/lib/db/charity";
import Link from "next/link";

export default async function CharityStaffHeaderButton() {
    const { userId } = await getCurrentUserIdAction();
    if (!userId) return null;
    const isCharityStaff = await isCharityCreatorOrStaff(userId);
    if (!isCharityStaff) return null;
    return (
        <Link href="/charity-staff">
            <Button>Staff Dashboard</Button>
        </Link>
    );
}
