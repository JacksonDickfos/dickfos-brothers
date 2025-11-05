"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE } from "@/lib/siteConfig";
import { Instagram } from "lucide-react";

export function HeroSplit() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0B0C]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Brother 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2">Brother One</h2>
              <p className="text-[#a1a1aa]">The Strategist</p>
            </div>
          </motion.div>

          {/* Center - Headline */}
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 text-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#6EE7F9] to-[#A78BFA] bg-clip-text text-transparent"
            >
              Same DNA,
              <br />
              Different Decisions.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#6EE7F9] px-6 py-3 text-[#0B0B0C] font-semibold transition-all hover:bg-[#6EE7F9]/90 hover:scale-105"
              >
                <Instagram size={20} />
                Watch on Instagram
              </a>
              <Link
                href="/competitions"
                className="inline-flex items-center rounded-full border-2 border-[#6EE7F9] px-6 py-3 text-[#6EE7F9] font-semibold transition-all hover:bg-[#6EE7F9]/10 hover:scale-105"
              >
                Join the Next Challenge
              </Link>
            </motion.div>
          </div>

          {/* Right side - Brother 2 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-right"
          >
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2">Brother Two</h2>
              <p className="text-[#a1a1aa]">The Creative</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

