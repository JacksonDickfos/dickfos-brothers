"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/siteConfig";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [brand, setBrand] = useState<"resemblance" | "dickfos">("dickfos");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1A1B1F] bg-[#0B0B0C]/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#6EE7F9] text-[#0B0B0C] font-bold">
            {brand === "resemblance" ? "R" : "DB"}
          </div>
          <span className="font-heading text-xl font-semibold">
            {brand === "resemblance" ? SITE.parentCompany : SITE.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-[#6EE7F9]">
            About
          </Link>
          <Link href="/series" className="text-sm font-medium transition-colors hover:text-[#6EE7F9]">
            Series
          </Link>
          <Link href="/competitions" className="text-sm font-medium transition-colors hover:text-[#6EE7F9]">
            Competitions
          </Link>
          <Link href="/gallery" className="text-sm font-medium transition-colors hover:text-[#6EE7F9]">
            Gallery
          </Link>
          <Link href="/newsletter" className="text-sm font-medium transition-colors hover:text-[#6EE7F9]">
            Newsletter
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-[#6EE7F9]">
            Contact
          </Link>
          <button
            onClick={() => setBrand(brand === "resemblance" ? "dickfos" : "resemblance")}
            className="rounded-full bg-[#111215] px-4 py-2 text-xs font-medium transition-colors hover:bg-[#1A1B1F]"
            aria-label="Toggle brand"
          >
            {brand === "resemblance" ? "→ DB" : "→ R"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[#1A1B1F] bg-[#0B0B0C] md:hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              <Link href="/about" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link href="/series" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                Series
              </Link>
              <Link href="/competitions" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                Competitions
              </Link>
              <Link href="/gallery" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                Gallery
              </Link>
              <Link href="/newsletter" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                Newsletter
              </Link>
              <Link href="/contact" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
              <button
                onClick={() => {
                  setBrand(brand === "resemblance" ? "dickfos" : "resemblance");
                  setIsOpen(false);
                }}
                className="rounded-full bg-[#111215] px-4 py-2 text-xs font-medium text-left"
              >
                Switch to {brand === "resemblance" ? "Dickfos Brothers" : "Resemblance"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

