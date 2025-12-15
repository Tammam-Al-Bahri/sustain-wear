import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DonationHeaderButton() {
    return (
        <Link href="/donor">
            <Button>Donor Dashboard</Button>
        </Link>
    );
}
