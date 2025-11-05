import Link from "next/link";
import { Instagram, Mail } from "lucide-react";
import { SITE, getCurrentYear } from "@/lib/siteConfig";

export function Footer() {
  return (
    <footer className="border-t border-[#1A1B1F] bg-[#111215]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#6EE7F9] text-[#0B0B0C] font-bold">
                R
              </div>
              <span className="font-heading text-xl font-semibold">{SITE.parentCompany}</span>
            </div>
            <p className="text-sm text-[#a1a1aa] mb-4">{SITE.tagline}</p>
            <div className="flex gap-4">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a1a1aa] transition-colors hover:text-[#6EE7F9]"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="text-[#a1a1aa] transition-colors hover:text-[#6EE7F9]"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-[#a1a1aa] transition-colors hover:text-[#6EE7F9]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/series" className="text-[#a1a1aa] transition-colors hover:text-[#6EE7F9]">
                  Series
                </Link>
              </li>
              <li>
                <Link href="/competitions" className="text-[#a1a1aa] transition-colors hover:text-[#6EE7F9]">
                  Competitions
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-[#a1a1aa] transition-colors hover:text-[#6EE7F9]">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-[#a1a1aa] transition-colors hover:text-[#6EE7F9]">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#a1a1aa] transition-colors hover:text-[#6EE7F9]">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-[#a1a1aa] transition-colors hover:text-[#6EE7F9]">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[#1A1B1F] pt-8 text-center text-sm text-[#a1a1aa]">
          <p>© {getCurrentYear()} {SITE.parentCompany}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

