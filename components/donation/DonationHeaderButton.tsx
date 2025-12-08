"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DonateButton() {
    const pathname = usePathname();
    if (pathname !== "/donor") return null;
    return (
        <Link href="/app/test/item/">
            <Button>Donate</Button>
        </Link>
    );
}
