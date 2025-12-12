"use server";

import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { checkUser } from "@/lib/checkUser";
import DonationHeaderButton from "./donation/DonationHeaderButton";

export default async function Header() {
    const user = await checkUser();

    return (
        <header className="flex justify-between items-center p-4 h-16">
            {/* Left side (Logo) */}
            <Link href="/">
                <p>SustainWear</p>
            </Link>

            {/* Right side (sign buttons / user) */}
            <div className="flex items-center gap-4">
                <SignedOut>
                    <div className="flex items-center gap-3">
                        <Link href="/sign-in">
                            <Button variant="outline">Sign In</Button>
                        </Link>

                        <Link href="/sign-up">
                            <Button>Sign Up</Button>
                        </Link>
                    </div>
                </SignedOut>

                <SignedIn>
                    <DonationHeaderButton />
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </div>
        </header>
    );
}
