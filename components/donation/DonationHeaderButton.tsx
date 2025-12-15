import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DonationHeaderButton() {
    return (
        <div>
            <Link href="/donor/your-items">
                <Button>List and Donate</Button>
            </Link>
        </div>
    );
}
