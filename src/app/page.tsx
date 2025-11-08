import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dickfos Brothers | Same DNA, Different Decisions",
  description: "Two brothers. One brand. Same DNA, different decisions.",
  openGraph: {
    title: "Dickfos Brothers",
    description: "Same DNA, Different Decisions",
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
        <section className="flex min-h-[80vh] items-center justify-center py-20 px-4">
          <div className="flex flex-col items-center">
            {/* Circular Logo with Gradient Border */}
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-red-500 to-blue-500 p-1 animate-pulse" style={{
                background: 'linear-gradient(135deg, #A78BFA 0%, #EF4444 50%, #3B82F6 100%)',
                animation: 'none'
              }}>
                <div className="rounded-full bg-[#0B0B0C] p-1">
                  <div className="relative h-64 w-64 rounded-full overflow-hidden">
                    <Image
                      src="/images/logo.jpg"
                      alt="Dickfos Brothers"
                      fill
                      className="object-cover"
                      priority
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
              Same DNA, Different Decisions
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
