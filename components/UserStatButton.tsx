"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function UserStatButton() {
    const pathname = usePathname();
    if (pathname !== "/donor") return null;
    return (
        <Link href="/donor-stats">
            <Button>Stats</Button>
        </Link>
    );
}
