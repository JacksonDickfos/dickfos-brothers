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
              <div 
                className="rounded-full p-[4px]"
                style={{
                  background: 'linear-gradient(135deg, #A78BFA 0%, #EF4444 50%, #3B82F6 100%)',
                }}
              >
                <div className="rounded-full bg-[#0B0B0C] p-[3px]">
                  <div className="relative h-64 w-64 rounded-full overflow-hidden bg-[#111215]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/logo.jpg"
                      alt="Dickfos Brothers"
                      className="object-cover rounded-full w-full h-full"
                      style={{ width: '100%', height: '100%' }}
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
