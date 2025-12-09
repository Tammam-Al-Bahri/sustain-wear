"use server";

import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
    const user = await checkUser();
    return (
        <header className="flex justify-end items-center p-4 gap-4 h-16">
            <p className="font-bold text-lg text-[#274D22]">SustainWear</p>
            <SignedOut>
                <SignInButton>
                    <Button variant="outline" className="px-8 font-semibold border rounded-[15px] border-white border-opacity-30" >Log in</Button>
                </SignInButton>
                <SignUpButton>
                    <Button className="px-8 font-semibold border rounded-[15px] border-white border-opacity-30">Sign Up</Button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header>
    );
}
