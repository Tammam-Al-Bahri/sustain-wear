"use server";

import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { checkUser } from "@/lib/checkUser";
import DonationHeaderButton from "./donation/DonationHeaderButton";
import UserStatButton from "./UserStatButton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/headerDropDown";
import CharityStaffHeaderButton from "./charity/CharityStaffHeaderButton";
import { ModeToggle } from "./mode-toggle";
import { Settings as SettingsIcon } from "lucide-react";

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
          {/* Large screens: show buttons inline */}
          <div className="hidden md:flex items-center gap-3">
            {/* ✅ Settings */}
            <Link href="/Settings">
              <Button
                variant="outline"
                className="px-6 font-semibold border rounded-[15px] border-white border-opacity-30 gap-2"
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
              </Button>
            </Link>

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

                    < Temporary merge branch 1
                    {/* Small screens: show dropdown */}
                    <div className="md:hidden flex">
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Menu</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Link href="/sign-in" className="w-full">
                                        Log in
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/sign-up" className="w-full">
                                        Sign Up
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <CharitiesHeaderButton />
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <DonationHeaderButton />
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <CharityStaffHeaderButton />
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <UserStatButton />
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <ModeToggle />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </SignedOut>

                <SignedIn>
                    {/* Large screens: show buttons inline */}
                    <div className="hidden md:flex gap-4">
                        <CharitiesHeaderButton />
                        <DonationHeaderButton />
                        <CharityStaffHeaderButton />
                        <UserStatButton />
                        <ModeToggle />
                        <UserButton afterSignOutUrl="/" />
                    </div>

                    {/* Small screens: show dropdown */}
                    <div className="flex md:hidden  gap-4">
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Menu</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <CharitiesHeaderButton />
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <DonationHeaderButton />
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <CharityStaffHeaderButton />
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <UserStatButton />
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <ModeToggle />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </SignedIn>
            </div>
        </header>
    );

            <ModeToggle />
          </div>

          {/* Small screens: show dropdown */}
          <div className="md:hidden flex">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Menu</Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                {/* ✅ Settings */}
                <DropdownMenuItem asChild>
                  <Link href="/Settings" className="w-full flex items-center gap-2">
                    <SettingsIcon className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/sign-in" className="w-full">
                    Log in
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/sign-up" className="w-full">
                    Sign Up
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <DonationHeaderButton />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CharityStaffHeaderButton />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserStatButton />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ModeToggle />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SignedOut>

        <SignedIn>
          {/* Large screens: show buttons inline */}
          <div className="hidden md:flex gap-4 items-center">
            {/* ✅ Settings */}
            <Link href="/Settings">
              <Button
                variant="outline"
                className="px-6 font-semibold border rounded-[15px] border-white border-opacity-30 gap-2"
              />
                <SettingsIcon className="h-4 w-4" />
                Settings
              </Button>
            </Link>

            <DonationHeaderButton />
            <CharityStaffHeaderButton />
            <UserStatButton />
            <ModeToggle />
            <UserButton afterSignOutUrl="/" />
          </div>

          {/* Small screens: show dropdown */}
          <div className="flex md:hidden gap-4 items-center">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Menu</Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                {/* ✅ Settings */}
                <DropdownMenuItem asChild>
                  <Link href="/Settings" className="w-full flex items-center gap-2">
                    <SettingsIcon className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <DonationHeaderButton />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CharityStaffHeaderButton />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserStatButton />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ModeToggle />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      <div/>
    </header>
  );

}
