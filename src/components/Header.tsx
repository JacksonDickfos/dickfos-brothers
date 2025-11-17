"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/siteConfig";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1A1B1F] bg-[#0B0B0C]/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation - Centered */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="text-sm font-medium transition-colors hover:text-[#6EE7F9]"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, "#about")}
            className="text-sm font-medium transition-colors hover:text-[#6EE7F9]"
          >
            About Us
          </a>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors hover:text-[#6EE7F9]"
          >
            Instagram
          </a>
          <a
            href={SITE.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors hover:text-[#6EE7F9]"
          >
            TikTok
          </a>
          <a
            href="#work"
            onClick={(e) => handleNavClick(e, "#work")}
            className="text-sm font-medium transition-colors hover:text-[#6EE7F9]"
          >
            Work With Us
          </a>
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
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, "#home")}
                className="text-sm font-medium"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, "#about")}
                className="text-sm font-medium"
              >
                About Us
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium"
              >
                Instagram
              </a>
              <a
                href={SITE.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium"
              >
                TikTok
              </a>
              <a
                href="#work"
                onClick={(e) => handleNavClick(e, "#work")}
                className="text-sm font-medium"
              >
                Work With Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
