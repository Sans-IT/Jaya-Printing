import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { CompanyName } from "@/lib/globalvar";
import { BsTelephone } from "react-icons/bs";
import { ModeToggle } from "./ModeToggle";
import UserProfile from "./UserProfile";

function Navbar() {
  return (
    <Card className="bg-inherit rounded-none shadow-none border-none px-3 sticky top-0 z-[10000]">
      <div className="flex items-center w-full max-w-7xl mx-auto">
        <Link href={"/"} className="flex items-center gap-3">
          <Image
            width="40"
            height="40"
            src="/image/logo.png"
            alt="logo"
            className="rounded-full"
          />
          <h1 className="font-bold capitalize">{CompanyName}</h1>
        </Link>
        <div className="flex items-center gap-1 ms-auto">
          <span className="text-xs hidden items-center gap-1 sm:flex">
            <BsTelephone /> <span>0812-3030-8379</span> /{" "}
            <span>0813-3950-3980</span>
          </span>
          <ModeToggle />
          <UserProfile />
        </div>
      </div>
    </Card>
  );
}

export default Navbar;
