import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Countdown } from "@/components/Countdown";
import { CompetitionEntryForm } from "@/components/CompetitionEntryForm";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Competition {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  prize: string | null;
  starts_at: string;
  ends_at: string;
  rules_md: string | null;
  sponsor: string | null;
  hero_image: string | null;
  is_active: boolean;
}

// Mock data - replace with Supabase query
async function getCompetition(slug: string): Promise<Competition | null> {
  // TODO: Replace with actual Supabase query
  // const { data, error } = await supabase
  //   .from("competitions")
  //   .select("*")
  //   .eq("slug", slug)
  //   .single();

  return {
    id: "1",
    slug,
    title: "This Week's Challenge",
    summary: "Show us your best interpretation of our latest challenge theme. Get creative and show us what you've got!",
    prize: "$500 gift card",
    starts_at: new Date().toISOString(),
    ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    rules_md: `## Rules

1. Follow @dickfosbrothers on Instagram
2. Create your submission based on the challenge theme
3. Submit your entry before the deadline
4. One entry per person
5. Must be 18+ to participate

## Prize
$500 gift card to the winner!`,
    sponsor: null,
    hero_image: null,
    is_active: true,
  };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const competition = await getCompetition(slug);
  if (!competition) {
    return { title: "Competition Not Found" };
  }

  return {
    title: competition.title,
    description: competition.summary || "Join our competition and compete for amazing prizes!",
  };
}

export default async function CompetitionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const competition = await getCompetition(slug);

  if (!competition) {
    notFound();
  }

  const endsAt = new Date(competition.ends_at);
  const isActive = competition.is_active && endsAt > new Date();

  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0C]">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        {competition.hero_image && (
          <section className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={competition.hero_image}
              alt={competition.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] to-transparent" />
          </section>
        )}

        <section className="py-16 bg-[#0B0B0C]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              {isActive && (
                <span className="inline-block rounded-full bg-[#A78BFA] px-3 py-1 text-xs font-semibold mb-4">
                  Active
                </span>
              )}
              <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">{competition.title}</h1>
              {competition.summary && (
                <p className="text-lg text-[#a1a1aa] mb-6">{competition.summary}</p>
              )}
            </div>

            {/* Countdown */}
            {isActive && (
              <div className="rounded-2xl bg-[#111215] border border-[#1A1B1F] p-6 mb-8">
                <p className="text-sm text-[#a1a1aa] mb-4">Ends in:</p>
                <Countdown endDate={endsAt} />
              </div>
            )}

            {/* Prize */}
            {competition.prize && (
              <div className="rounded-2xl bg-[#111215] border border-[#1A1B1F] p-6 mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-2">Prize</h2>
                <p className="text-[#6EE7F9] text-xl font-semibold">{competition.prize}</p>
              </div>
            )}

            {/* Rules */}
            {competition.rules_md && (
              <div className="rounded-2xl bg-[#111215] border border-[#1A1B1F] p-6 mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">Rules</h2>
                <div
                  className="prose prose-invert max-w-none text-[#a1a1aa]"
                  dangerouslySetInnerHTML={{ __html: competition.rules_md.replace(/\n/g, "<br>") }}
                />
              </div>
            )}

            {/* Sponsor */}
            {competition.sponsor && (
              <div className="rounded-2xl bg-[#111215] border border-[#1A1B1F] p-6 mb-8">
                <p className="text-sm text-[#a1a1aa] mb-2">Sponsored by</p>
                <p className="font-semibold">{competition.sponsor}</p>
              </div>
            )}

            {/* Entry Form */}
            {isActive ? (
              <CompetitionEntryForm competitionId={competition.id} competitionSlug={competition.slug} />
            ) : (
              <div className="rounded-2xl bg-[#111215] border border-[#1A1B1F] p-6 text-center">
                <p className="text-[#a1a1aa]">This competition has ended.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

