import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Learn about the Dickfos Brothers and our journey.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0C]">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-[#0B0B0C]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-8">Our Story</h1>
            <div className="prose prose-invert max-w-none">
              <div className="mb-8 p-8 rounded-2xl bg-[#111215] border border-[#1A1B1F]">
                <h2 className="font-heading text-2xl font-semibold mb-4 text-[#6EE7F9]">
                  Same DNA, Different Minds
                </h2>
                <p className="text-[#a1a1aa] leading-relaxed">
                  We're two brothers with identical DNA but completely different approaches to life, 
                  business, and everything in between. This isn't just a brand—it's an experiment 
                  in nature vs nurture, strategy vs creativity, and finding out what happens when 
                  the same genetic blueprint takes two different paths.
                </p>
              </div>
              <p className="text-[#a1a1aa] leading-relaxed mb-6">
                Dickfos Brothers is where we share our weekly challenges, experiments, and the hilarious 
                differences that emerge from our shared foundation.
              </p>
              <p className="text-[#a1a1aa] leading-relaxed">
                Follow our journey as we navigate the world with the same DNA but different decisions.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

