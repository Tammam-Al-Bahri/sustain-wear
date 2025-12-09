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
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
    const user = await checkUser();
    return (
        <header className="flex justify-end items-center p-4 gap-4 h-16">
             {/* TODO: Make the 'SustainWear' text redirect you to options below when pressed :
             the landing page (if not logged in) or
             the dashboard (if logged in) */}
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
                <DonationHeaderButton />
                <UserButton />
            </SignedIn>
        </header>
    );
}
