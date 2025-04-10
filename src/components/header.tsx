"use client";

import {
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
import { LayoutDashboard, PenBox, Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const Header = ({ role }: { role: "ADMIN" | "USER" }) => {
  const { user } = useUser();

  return (
    <div className="fixed top-0 w-full bg-white/50 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 md:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src={"/logo-finall.png"}
            alt="logo masjid"
            width={100}
            height={300}
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline" className="flex items-center gap-2">
                <LayoutDashboard size={18} />
                Dashboard
              </Button>
            </Link>

            {role === "ADMIN" && (
              <Link href="/transaction/create">
                <Button className="flex items-center gap-2">
                  <PenBox size={18} />
                  Add Transaction
                </Button>
              </Link>
            )}
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl={"/dashboard"}>
              <Button className="bg-yellow-500">Login</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex flex-col items-center text-center p-6 space-y-6"
            >
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold">Masjid Al-Kautsar</SheetTitle>
              </SheetHeader>
              {/* Avatar & Email */}
              <SignedIn>
                <div className="flex flex-col items-center space-y-2 mt-4">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-16 h-16 border-2 border-gray-300 shadow-md",
                      },
                    }}
                  />
                  <p className="text-sm text-gray-800 font-medium">
                    {user?.primaryEmailAddress?.emailAddress || user?.fullName}
                  </p>
                </div>
              </SignedIn>

              {/* Menu Items */}
              <div className="w-full flex flex-col items-center space-y-3">
                <SignedIn>
                  <Link href="/dashboard" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Button>
                  </Link>

                  {role === "ADMIN" && (
                    <Link href="/transaction/create" className="w-full">
                      <Button className="w-full justify-start gap-2">
                        <PenBox size={18} />
                        Add Transaction
                      </Button>
                    </Link>
                  )}
                </SignedIn>

                <SignedOut>
                  <SignInButton forceRedirectUrl={"/dashboard"}>
                    <Button className="w-full bg-yellow-500">Login</Button>
                  </SignInButton>
                </SignedOut>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
};

export default Header;
