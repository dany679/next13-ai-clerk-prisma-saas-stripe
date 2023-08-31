"use client";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });
const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <nav
      className={cn(
        "p-4 bg-transparent flex flex-row justify-between items-center",
        montserrat
      )}
    >
      <Link href="/" className="flex items-center">
        <div className="relative w-8 h-8 mr-4">
          <Image fill alt="Logo" src="/logo.png" />
        </div>
        <h1 className="text-2xl font-bold text-white">Genius</h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "sign-up"}>
          <Button variant="outline" className="rounded-full">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
