"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./mode-toggle";
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

export const SiteHeader = () => {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setProgress(20);
    setTimeout(() => setProgress(100), 400);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setProgress(0), 50);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "shadow-md" : "bg-white/80 dark:bg-[#020817]"
      } backdrop-blur`}
    >
      <LoadingBar
        color="#4f46e5"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        shadow={true}
        className="z-50"
      />
      <div className="container mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            {/* from-purple-600 to-blue-500 */}
            <div
              className={`text-xl font-bold transition-colors ${
                scrolled
                  ? "text-gray-900 dark:text-gray-50 hover:text-indigo-600 dark:hover:text-indigo-600"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:text-transparent dark:hover:from-purple-600 dark:hover:to-blue-500"
              }`}
            >
              Sync
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition-colors hover:text-indigo-600
                  after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-indigo-600
                  after:transition-all after:duration-300 hover:after:w-full
                  ${
                    pathname === link.href
                      ? "text-indigo-600 after:w-full"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-indigo-50 dark:text-gray-300"
              >
                Login
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Sign up
              </Button>
              <ModeToggle />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-indigo-50 dark:hover:bg-gray-800"
                >
                  <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col space-y-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`font-medium transition-colors hover:text-indigo-600 ${
                        pathname === link.href
                          ? "text-indigo-600"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="flex flex-col space-y-2 pt-4">
                    <Button
                      variant="ghost"
                      className="w-full justify-center py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 md:hidden"
                    >
                      Login
                    </Button>
                    <Button
                      variant="default"
                      className="w-full justify-center py-2 text-white bg-indigo-700 rounded-lg hover:bg-indigo-600 md:hidden"
                    >
                      Sign up
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
