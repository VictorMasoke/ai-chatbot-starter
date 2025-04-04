import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Menu, LineChart, Wallet } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#0C1427] text-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="mr-4 flex items-center">
          <Link className="flex items-center space-x-2" href="/">
            <span className="text-xl font-bold">C-Trade</span>
          </Link>
          <nav className="ml-10 hidden items-center space-x-8 text-sm font-medium md:flex">
            <Link href="/markets" className="hover:text-[#6571E3]">
              Markets
            </Link>
            <Link href="/stocks" className="hover:text-[#6571E3]">
              Stocks
            </Link>
            <Link href="/bonds" className="hover:text-[#6571E3]">
              Bonds
            </Link>
            <Link href="/forex" className="hover:text-[#6571E3]">
              Forex
            </Link>
          </nav>
        </div>
        
        <button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white focus:outline-none md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:bg-[#6571E3]/20">
            <Wallet className="mr-2 h-4 w-4" />
            Portfolio
          </Button>
          <Button className="bg-[#048B3F] hover:bg-[#048B3F]/90">
            Trade Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;


