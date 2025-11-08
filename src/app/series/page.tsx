import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Series",
  description: "Content series from Dickfos Brothers.",
};

export default function SeriesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0C]">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold mb-4 text-white">Series</h1>
          <p className="text-[#a1a1aa]">Content coming soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
