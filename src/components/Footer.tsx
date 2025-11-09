import { SITE, getCurrentYear } from "@/lib/siteConfig";

export function Footer() {
  return (
    <footer className="border-t border-[#1A1B1F] bg-[#111215]">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-[#a1a1aa]">
          <p>© {getCurrentYear()} {SITE.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
