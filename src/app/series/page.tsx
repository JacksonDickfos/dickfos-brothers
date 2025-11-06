import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { series } from "@/lib/siteConfig";
import { Metadata } from "next";
import nextDynamic from "next/dynamic";

// Dynamically import SeriesCard to avoid framer-motion server-side errors
const SeriesCard = nextDynamic(() => import("@/components/SeriesCard").then(m => ({ default: m.SeriesCard })), {
  ssr: true,
});

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Series",
  description: "Explore our content series including Brother vs Brother, Same DNA Test, and more.",
};

export default function SeriesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0C]">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-[#0B0B0C]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-center">
              Content Hub
            </h1>
            <p className="text-center text-[#a1a1aa] mb-12 max-w-2xl mx-auto">
              Discover our signature series where we explore the differences and similarities 
              that come from sharing the same DNA.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {series.map((s) => (
                <SeriesCard key={s.slug} {...s} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

