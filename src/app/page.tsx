import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

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

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0C]">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold mb-4 text-white">Dickfos Brothers</h1>
          <p className="text-xl text-[#a1a1aa]">Same DNA, Different Decisions</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
