import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowRight, LineChart, Shield, Zap, BarChart2, Smartphone, Globe } from "lucide-react";

const LandingSections = () => {
  return (
    <div className="bg-[#0C1427] text-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-[#0C1427] to-[#1A2342]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  Trade Zimbabwean Securities <br />
                  <span className="text-[#FBBC06]">With Confidence</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-lg text-gray-300">
                  C-Trade offers seamless access to ZSE listed stocks, bonds, and forex markets with real-time data and secure trading.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#048B3F] hover:bg-[#048B3F]/90 h-12 px-8" asChild>
                  <Link href="/signup">Open Free Account</Link>
                </Button>
                <Button variant="outline" className="border-[#6571E3] text-[#6571E3] hover:bg-[#6571E3]/10 h-12 px-8" asChild>
                  <Link href="/markets">Explore Markets</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Market Data Section */}
        <section className="w-full py-12 bg-[#1A2342]">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-6 rounded-lg bg-[#0C1427]/50">
                <p className="text-2xl font-bold text-[#FBBC06]">157</p>
                <p className="text-sm text-gray-300">Listed Stocks</p>
              </div>
              <div className="p-6 rounded-lg bg-[#0C1427]/50">
                <p className="text-2xl font-bold text-[#FBBC06]">42</p>
                <p className="text-sm text-gray-300">Government Bonds</p>
              </div>
              <div className="p-6 rounded-lg bg-[#0C1427]/50">
                <p className="text-2xl font-bold text-[#FBBC06]">24/7</p>
                <p className="text-sm text-gray-300">Forex Trading</p>
              </div>
              <div className="p-6 rounded-lg bg-[#0C1427]/50">
                <p className="text-2xl font-bold text-[#FBBC06]">10K+</p>
                <p className="text-sm text-gray-300">Active Traders</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0C1427]">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
              Why Trade With <span className="text-[#FBBC06]">C-Trade</span>
            </h2>
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-lg bg-[#1A2342]">
                <div className="rounded-full bg-[#6571E3] p-3">
                  <LineChart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Real-Time Market Data</h3>
                <p className="text-gray-300">
                  Get live ZSE prices, indices, and forex rates with our advanced trading platform.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-lg bg-[#1A2342]">
                <div className="rounded-full bg-[#6571E3] p-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Secure Trading</h3>
                <p className="text-gray-300">
                  Bank-grade security and ZIMRA-compliant transactions for peace of mind.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-lg bg-[#1A2342]">
                <div className="rounded-full bg-[#6571E3] p-3">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Lightning Fast Execution</h3>
                <p className="text-gray-300">
                  Place orders in milliseconds with our high-performance trading engine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trading Platforms Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#1A2342]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Trade <span className="text-[#FBBC06]">Anywhere</span>
                </h2>
                <p className="text-lg text-gray-300">
                  Access Zimbabwe's financial markets from your desktop, tablet, or mobile device with our powerful trading platforms.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Smartphone className="h-6 w-6 text-[#6571E3]" />
                    <span>Mobile Trading App</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Globe className="h-6 w-6 text-[#6571E3]" />
                    <span>Web Platform</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <BarChart2 className="h-6 w-6 text-[#6571E3]" />
                    <span>Advanced Desktop Platform</span>
                  </div>
                </div>
                <Button className="bg-[#6571E3] hover:bg-[#6571E3]/90 mt-6" asChild>
                  <Link href="/platforms">Explore Platforms</Link>
                </Button>
              </div>
              <div className="flex-1">
                {/* Placeholder for device mockups */}
                <div className="bg-[#0C1427] rounded-xl p-8 aspect-video flex items-center justify-center border border-[#6571E3]/30">
                  <p className="text-gray-400">Trading Platform Preview</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full py-20 bg-gradient-to-b from-[#1A2342] to-[#0C1427]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Start Trading?
              </h2>
              <p className="text-lg text-gray-300">
                Join thousands of Zimbabwean investors who trust C-Trade for their securities trading needs.
              </p>
              <Button className="bg-[#048B3F] hover:bg-[#048B3F]/90 h-12 px-8" asChild>
                <Link href="/signup">Open Your Account Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-6 py-12 w-full border-t border-[#1A2342] bg-[#0C1427]">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Markets</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/stocks" className="hover:text-[#6571E3]">Stocks</Link></li>
                <li><Link href="/bonds" className="hover:text-[#6571E3]">Bonds</Link></li>
                <li><Link href="/forex" className="hover:text-[#6571E3]">Forex</Link></li>
                <li><Link href="/etfs" className="hover:text-[#6571E3]">ETFs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Platforms</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/web" className="hover:text-[#6571E3]">Web Platform</Link></li>
                <li><Link href="/mobile" className="hover:text-[#6571E3]">Mobile App</Link></li>
                <li><Link href="/desktop" className="hover:text-[#6571E3]">Desktop</Link></li>
                <li><Link href="/api" className="hover:text-[#6571E3]">Trading API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-[#6571E3]">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-[#6571E3]">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-[#6571E3]">Contact</Link></li>
                <li><Link href="/news" className="hover:text-[#6571E3]">News</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/terms" className="hover:text-[#6571E3]">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-[#6571E3]">Privacy</Link></li>
                <li><Link href="/compliance" className="hover:text-[#6571E3]">Compliance</Link></li>
                <li><Link href="/disclosures" className="hover:text-[#6571E3]">Disclosures</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#1A2342] mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 C-Trade Securities (Pvt) Ltd. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <Link href="#" className="text-gray-400 hover:text-[#6571E3]">
                <span className="sr-only">Facebook</span>
                {/* Facebook icon */}
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#6571E3]">
                <span className="sr-only">Twitter</span>
                {/* Twitter icon */}
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#6571E3]">
                <span className="sr-only">LinkedIn</span>
                {/* LinkedIn icon */}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingSections;