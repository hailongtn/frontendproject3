"use client";
import React from "react";
import { Button } from "./ui/button";
import { Heart, CarFront, Layout, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Header = ({ isAdminPage = false }) => {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={isAdminPage ? "/admin" : "/"} className="flex items-center">
          <Image
            src="/logo-black.png"
            alt="Showroom Logo"
            width={180}
            height={50}
            className="h-12 w-auto object-contain"
          />
          {isAdminPage && (
            <span className="ml-2 text-xs font-light text-gray-500">admin</span>
          )}
        </Link>

        {/* Các nút chức năng */}
        <div className="flex items-center space-x-4">
          {isAdminPage ? (
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft size={18} />
                <span>Back to App</span>
              </Button>
            </Link>
          ) : (
            <>

              <Link href="/saved-cars">
                <Button className="flex items-center gap-2">
                  <Heart size={18} />
                  <span className="hidden md:inline">Saved Cars</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
