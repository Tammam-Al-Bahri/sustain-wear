"use server";

import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
    const user = await checkUser();
    return (
        <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
                <SignInButton />
                <SignUpButton>
                    <Button>Sign Up</Button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header>
    );
}
