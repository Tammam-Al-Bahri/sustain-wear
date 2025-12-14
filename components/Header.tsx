"use server";

import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { checkUser } from "@/lib/checkUser";
import DonationHeaderButton from "./donation/DonationHeaderButton";
import UserStatButton from "./UserStatButton";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/headerDropDown";

export default async function Header() {
  const user = await checkUser();

  return (
    <header className="flex justify-between items-center p-4 h-16">
      {/* Left side (Logo) */}
      <Link href="/">
        <p className="font-bold text-lg text-[#274D22]">SustainWear</p>
      </Link>

      {/* Right side (sign buttons / user) */}
      <div className="flex items-center gap-4">
        <SignedOut>
          <div className="flex items-center gap-3">
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="px-8 font-semibold border rounded-[15px] border-white border-opacity-30"
              >
                Log in
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button className="px-8 font-semibold border rounded-[15px] border-white border-opacity-30">
                Sign Up
              </Button>
            </Link>
          </div>
        </SignedOut>

                 <SignedIn>
                    {/* Large screens: show buttons inline */}
                    <div className="hidden md:flex gap-4">
                        <DonationHeaderButton />
                        <UserStatButton />
                        <UserButton afterSignOutUrl="/" />
                    </div>

                    {/* Small screens: show dropdown */}
                    <div className="md:hidden">
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Menu</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                            <DonationHeaderButton />
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                            <UserStatButton />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </SignedIn>

            </div>
        </header>
    );
}
