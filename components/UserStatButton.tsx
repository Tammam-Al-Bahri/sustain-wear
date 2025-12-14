"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function UserStatButton() {
    const pathname = usePathname();
    if (pathname !== "/donor") return null;
    return (
        <Link href="/donor-stats">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
                Stats
            </Button>
        </Link>
    );
}
