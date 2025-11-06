import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { series } from "@/lib/siteConfig";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import nextDynamic from "next/dynamic";

// Dynamically import client components with SSR disabled to avoid server-side errors
const HeroSplit = nextDynamic(() => import("@/components/HeroSplit").then(m => ({ default: m.HeroSplit })), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center bg-[#0B0B0C]" />
});

const SeriesCard = nextDynamic(() => import("@/components/SeriesCard").then(m => ({ default: m.SeriesCard })), {
  ssr: false,
  loading: () => <div className="rounded-2xl bg-[#111215] border border-[#1A1B1F] h-64 animate-pulse" />
});

const EmailCapture = nextDynamic(() => import("@/components/EmailCapture").then(m => ({ default: m.EmailCapture })), {
  ssr: false,
});

const SocialWall = nextDynamic(() => import("@/components/SocialWall").then(m => ({ default: m.SocialWall })), {
  ssr: false,
});

const Countdown = nextDynamic(() => import("@/components/Countdown").then(m => ({ default: m.Countdown })), {
  ssr: false,
  loading: () => <div className="text-[#a1a1aa]">Loading countdown...</div>
});

export const metadata: Metadata = {
  title: "Dickfos Brothers | Same DNA, Different Decisions",
  description: "Two brothers. One brand. Same DNA, different decisions. Watch our weekly challenges, series, and competitions.",
  openGraph: {
    title: "Dickfos Brothers",
    description: "Same DNA, Different Decisions",
    type: "website",
    url: "https://dickfos-brothers.vercel.app",
  },
};

// Use auto static optimization - components will render client-side
// export const dynamic = 'force-dynamic';

// Mock active competition - replace with Supabase query
function getActiveCompetition() {
  try {
    return {
      slug: "weekly-challenge-1",
      title: "This Week's Challenge",
      summary: "Show us your best interpretation of our latest challenge theme. The winner gets a $500 gift card!",
      prize: "$500 gift card",
      endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      isActive: true,
    };
  } catch (error) {
    console.error("Error getting active competition:", error);
    return null;
  }
}

export default function HomePage() {
  // Filter series on server - this should be safe
  const featuredSeries = series.filter((s) => s.featured);
  const activeCompetition = getActiveCompetition();

  if (!activeCompetition) {
    return (
      <div className="flex min-h-screen flex-col bg-[#0B0B0C]">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0C]">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#0B0B0C]" />}>
          <HeroSplit />
        </Suspense>

          {/* Featured Series Carousel */}
          <section className="py-16 bg-[#0B0B0C]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 text-center">
                Featured Series
              </h2>
              <p className="text-center text-[#a1a1aa] mb-12 max-w-2xl mx-auto">
                Explore our signature content series where we test the limits of shared DNA and different minds.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredSeries.map((s) => (
                  <Suspense key={s.slug} fallback={<div className="rounded-2xl bg-[#111215] border border-[#1A1B1F] h-64 animate-pulse" />}>
                    <SeriesCard {...s} />
                  </Suspense>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href="/series"
                  className="inline-flex items-center text-[#6EE7F9] font-semibold hover:text-[#6EE7F9]/80 transition-colors"
                >
                  View All Series →
                </Link>
              </div>
            </div>
          </section>

          {/* This Week's Challenge */}
          <section className="py-16 bg-[#111215]">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="rounded-2xl bg-[#0B0B0C] border border-[#1A1B1F] p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="font-heading text-2xl md:text-3xl font-bold">This Week's Challenge</h2>
                      <span className="rounded-full bg-[#A78BFA] px-3 py-1 text-xs font-semibold">
                        Active
                      </span>
                    </div>
                    <p className="text-[#a1a1aa] mb-4">{activeCompetition.summary}</p>
                    <p className="text-sm font-semibold text-[#6EE7F9]">Prize: {activeCompetition.prize}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-[#a1a1aa] mb-3">Ends in:</p>
                  <Suspense fallback={<div className="text-[#a1a1aa]">Loading countdown...</div>}>
                    <Countdown endDate={activeCompetition.endsAt} />
                  </Suspense>
                </div>
                <Link
                  href={`/competitions/${activeCompetition.slug}`}
                  className="inline-flex items-center rounded-full bg-[#6EE7F9] px-6 py-3 text-[#0B0B0C] font-semibold transition-all hover:bg-[#6EE7F9]/90"
                >
                  Join this week's challenge →
                </Link>
              </div>
            </div>
          </section>

          {/* Social Pipes - Instagram & TikTok */}
          <Suspense fallback={<div className="py-16 bg-[#0B0B0C]" />}>
            <SocialWall mode="static" />
          </Suspense>

          {/* Email Capture */}
          <Suspense fallback={<div className="py-16 bg-[#0B0B0C]" />}>
            <EmailCapture />
          </Suspense>
        </main>
        <Footer />
      </div>
    );
}
