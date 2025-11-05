import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Competitions",
  description: "Join our active competitions and challenges. Enter for a chance to win prizes!",
};

// Mock data - replace with Supabase query
const competitions = [
  {
    slug: "weekly-challenge-1",
    title: "This Week's Challenge",
    summary: "Show us your best interpretation of our latest challenge theme.",
    prize: "$500 gift card",
    startsAt: new Date(),
    endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
];

export default function CompetitionsPage() {
  const activeCompetitions = competitions.filter((c) => c.isActive);
  const pastCompetitions = competitions.filter((c) => !c.isActive);

  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0C]">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-[#0B0B0C]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-center">
              Competitions
            </h1>
            <p className="text-center text-[#a1a1aa] mb-12 max-w-2xl mx-auto">
              Join our ongoing challenges. Enter your submission and compete for amazing prizes!
            </p>

            {activeCompetitions.length > 0 && (
              <div className="mb-16">
                <h2 className="font-heading text-2xl font-semibold mb-6">Active Competitions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeCompetitions.map((comp) => (
                    <Link
                      key={comp.slug}
                      href={`/competitions/${comp.slug}`}
                      className="block rounded-2xl bg-[#111215] border border-[#1A1B1F] p-6 hover:border-[#6EE7F9] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="rounded-full bg-[#A78BFA] px-3 py-1 text-xs font-semibold">
                          Active
                        </span>
                        <span className="text-sm text-[#a1a1aa]">
                          Ends in {Math.ceil((comp.endsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                        </span>
                      </div>
                      <h3 className="font-heading text-xl font-semibold mb-2">{comp.title}</h3>
                      <p className="text-[#a1a1aa] mb-4">{comp.summary}</p>
                      <p className="text-sm font-semibold text-[#6EE7F9]">Prize: {comp.prize}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {pastCompetitions.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-6">Past Competitions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pastCompetitions.map((comp) => (
                    <div
                      key={comp.slug}
                      className="rounded-2xl bg-[#111215] border border-[#1A1B1F] p-6 opacity-60"
                    >
                      <span className="rounded-full bg-[#a1a1aa] px-3 py-1 text-xs font-semibold mb-4 inline-block">
                        Ended
                      </span>
                      <h3 className="font-heading text-xl font-semibold mb-2">{comp.title}</h3>
                      <p className="text-[#a1a1aa]">{comp.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {competitions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#a1a1aa]">No competitions available at the moment.</p>
                <p className="text-sm text-[#a1a1aa] mt-2">Check back soon for new challenges!</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

