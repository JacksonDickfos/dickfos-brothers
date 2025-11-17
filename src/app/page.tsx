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
              Two brothers who look nothing alike 🙋🏾‍♂️🙆🏼‍♂️
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-[#0B0B0C] scroll-mt-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.3em] text-[#6EE7F9]/80 mb-3">About Us</p>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
                Two Brothers. One Vision.
              </h2>
              <p className="text-lg text-[#c3c3d1]">
                We turn ideas into ventures, and ventures into movements.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-[#1A1B1F] bg-gradient-to-br from-[#0f172a] via-[#0c1220] to-[#090c16] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center md:items-end md:text-right">
                <p className="text-sm uppercase tracking-[0.2em] text-[#6EE7F9]/70 mb-3 max-w-xs md:max-w-none">
                  Physio • Performance • Health • Lifestyle
                </p>
                <h3 className="text-3xl font-heading font-bold text-white mb-4">Corb</h3>
                <p className="text-[#c3c3d1] text-lg leading-relaxed max-w-sm">
                  The movement specialist. Turning bodies into machines and rehab into results.
                </p>
              </div>
              <div className="rounded-3xl border border-[#1A1B1F] bg-gradient-to-br from-[#0f172a] via-[#0c1220] to-[#090c16] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center md:items-start md:text-left">
                <p className="text-sm uppercase tracking-[0.2em] text-[#6EE7F9]/70 mb-3 max-w-xs md:max-w-none">
                  Private Equity • Business Strategy • Tech • Finance
                </p>
                <h3 className="text-3xl font-heading font-bold text-white mb-4">Jack</h3>
                <p className="text-[#c3c3d1] text-lg leading-relaxed max-w-sm">
                  The strategist. Building businesses that matter and tech that moves markets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Wall Section */}
        <section id="social" className="py-16 bg-[#111215] scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SocialWall mode="static" />
          </div>
        </section>

        <WorkWithUsSection />
      </main>
      <Footer />
    </div>
  );
}
