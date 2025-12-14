import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DonateButton() {
    return (
        <div>
            <Link href="/donor/your-items">
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                    List and Donate
                </Button>
            </Link>
            <Link href="/charity-staff/choose-items">
                <Button className="bg-green-500 hover:bg-green-600 text-white">Choose Items</Button>
            </Link>
        </div>
    );
}
