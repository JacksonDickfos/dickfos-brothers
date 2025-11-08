"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1A1B1F] bg-[#0B0B0C]/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation - Centered */}
        <div className="hidden items-center gap-8 md:flex">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
