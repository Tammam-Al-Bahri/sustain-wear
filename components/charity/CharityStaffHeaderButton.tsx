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
        <div>
            <Link href="/charity-staff/choose-items">
                <Button>Choose Items</Button>
            </Link>
        </div>
    );
}
