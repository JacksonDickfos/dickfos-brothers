import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EmailCapture } from "@/components/EmailCapture";
import { SocialWall } from "@/components/SocialWall";
import { Countdown } from "@/components/Countdown";
import { ContactForm } from "@/components/ContactForm";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dickfos Brothers | Brothers who look nothing alike",
  description: "Two brothers. One brand. Brothers who look nothing alike.",
  openGraph: {
    title: "Dickfos Brothers",
    description: "Brothers who look nothing alike 🙋🏾‍♂️🙆🏼‍♂️",
    type: "website",
    url: "https://dickfos-brothers.vercel.app",
  },
};

// Mock data
function getActiveCompetition() {
  return {
    slug: "weekly-challenge-1",
    title: "This Week's Challenge",
    summary: "Show us your best interpretation of our latest challenge theme. The winner gets a $500 gift card!",
    prize: "$500 gift card",
    endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    isActive: true,
  };
}

export default function HomePage() {
  const activeCompetition = getActiveCompetition();

  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0C]">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Circular Logo */}
        <section id="home" className="flex min-h-[90vh] items-center justify-center py-20 px-4 scroll-mt-20">
          <div className="flex flex-col items-center">
            {/* Circular Logo with Gradient Border */}
            <div className="relative mb-8">
              <div className="logo-gradient-border rounded-full p-[6px]">
                <div className="rounded-full bg-[#0B0B0C] p-[4px]">
                  <div className="relative h-[512px] w-[512px] rounded-full overflow-hidden bg-[#111215]">
                    <Image
                      src="/images/logo.jpeg"
                      alt="Dickfos Brothers"
                      width={512}
                      height={512}
                      className="object-cover rounded-full w-full h-full"
                      priority
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Title */}
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4 text-center">
              Dickfos Brothers
            </h1>
            <p className="text-xl text-[#a1a1aa] text-center max-w-2xl">
              Brothers who look nothing alike 🙋🏾‍♂️🙆🏼‍♂️
            </p>
          </div>
        </section>

        {/* Competitions Section */}
        <section id="competitions" className="py-16 bg-[#111215] scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-center">
              Competitions
            </h2>
            <p className="text-center text-[#a1a1aa] mb-12 max-w-2xl mx-auto">
              Join our ongoing challenges. Enter your submission and compete for amazing prizes!
            </p>

            {activeCompetition && (
              <div className="max-w-4xl mx-auto">
                <div className="rounded-2xl bg-[#0B0B0C] border border-[#1A1B1F] p-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading text-2xl md:text-3xl font-bold">{activeCompetition.title}</h3>
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
                    <Countdown endDate={activeCompetition.endsAt} />
                  </div>
                  <a
                    href={`/competitions/${activeCompetition.slug}`}
                    className="inline-flex items-center rounded-full bg-[#6EE7F9] px-6 py-3 text-[#0B0B0C] font-semibold transition-all hover:bg-[#6EE7F9]/90"
                  >
                    Join this week's challenge →
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Social Wall Section */}
        <section id="social" className="py-16 bg-[#111215] scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-center">
              Follow Our Journey
            </h2>
            <p className="text-center text-[#a1a1aa] mb-12 max-w-2xl mx-auto">
              See our latest content on Instagram and TikTok
            </p>
            <SocialWall mode="static" />
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="newsletter" className="scroll-mt-20">
          <EmailCapture />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-[#0B0B0C] scroll-mt-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-center">
              Contact Us
            </h2>
            <p className="text-center text-[#a1a1aa] mb-8">
              Have a question or want to collaborate? Get in touch!
            </p>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
