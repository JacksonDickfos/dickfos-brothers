import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SocialWall } from "@/components/SocialWall";
import { WorkWithUsSection } from "@/components/WorkWithUsSection";
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

export default function HomePage() {
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
              "Two brothers who look nothing alike" 🙋🏾‍♂️🙆🏼‍♂️
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-[#0B0B0C] scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-[#1A1B1F] bg-gradient-to-br from-[#0f172a] via-[#0c1220] to-[#090c16] p-8 flex flex-col items-center text-center md:items-end md:text-right transition-all hover:border-[#6EE7F9]">
                <p className="text-sm uppercase tracking-[0.2em] text-[#6EE7F9]/70 mb-3 max-w-xs md:max-w-none md:whitespace-nowrap">
                  Physio • Performance • Health • Lifestyle
                </p>
                <h3 className="text-3xl font-heading font-bold text-white mb-4">Corb</h3>
                <p className="text-[#c3c3d1] text-lg leading-relaxed max-w-sm">
                  The movement specialist. Turning bodies into machines and rehab into results.
                </p>
              </div>
              <div className="rounded-3xl border border-[#1A1B1F] bg-gradient-to-br from-[#0f172a] via-[#0c1220] to-[#090c16] p-8 flex flex-col items-center text-center md:items-start md:text-left transition-all hover:border-[#6EE7F9]">
                <p className="text-sm uppercase tracking-[0.2em] text-[#6EE7F9]/70 mb-3 max-w-xs md:max-w-none md:whitespace-nowrap">
                  Private Equity • Business • Tech • Finance
                </p>
                <h3 className="text-3xl font-heading font-bold text-white mb-4">Jack</h3>
                <p className="text-[#c3c3d1] text-lg leading-relaxed max-w-sm">
                  The strategist. Building businesses that matter and tech that moves markets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Section */}
        <section id="instagram" className="py-16 bg-[#111215] scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SocialWall mode="static" showOnly="instagram" />
          </div>
        </section>

        {/* TikTok Section */}
        <section id="tiktok" className="py-16 bg-[#0B0B0C] scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SocialWall mode="static" showOnly="tiktok" />
          </div>
        </section>

        <WorkWithUsSection />
      </main>
      <Footer />
    </div>
  );
}
