"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
            href="#competitions"
            onClick={(e) => handleNavClick(e, "#competitions")}
            className="text-sm font-medium transition-colors hover:text-[#6EE7F9]"
          >
            Competitions
          </a>
          <a
            href="#gallery"
            onClick={(e) => handleNavClick(e, "#gallery")}
            className="text-sm font-medium transition-colors hover:text-[#6EE7F9]"
          >
            Gallery
          </a>
          <a
            href="#newsletter"
            onClick={(e) => handleNavClick(e, "#newsletter")}
            className="text-sm font-medium transition-colors hover:text-[#6EE7F9]"
          >
            Newsletter
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="text-sm font-medium transition-colors hover:text-[#6EE7F9]"
          >
            Contact
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
                href="#competitions"
                onClick={(e) => handleNavClick(e, "#competitions")}
                className="text-sm font-medium"
              >
                Competitions
              </a>
              <a
                href="#gallery"
                onClick={(e) => handleNavClick(e, "#gallery")}
                className="text-sm font-medium"
              >
                Gallery
              </a>
              <a
                href="#newsletter"
                onClick={(e) => handleNavClick(e, "#newsletter")}
                className="text-sm font-medium"
              >
                Newsletter
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="text-sm font-medium"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
