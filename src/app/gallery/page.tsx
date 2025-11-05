import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "View featured submissions and social media content from our community.",
};

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0C]">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-[#0B0B0C]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-center">
              Gallery
            </h1>
            <p className="text-center text-[#a1a1aa] mb-12 max-w-2xl mx-auto">
              Featured submissions from our competitions and social media content.
            </p>

            {/* Placeholder grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-[#111215] border border-[#1A1B1F] flex items-center justify-center text-[#a1a1aa] text-sm"
                >
                  Gallery Item {i + 1}
                </div>
              ))}
            </div>

            <p className="text-center mt-8 text-sm text-[#a1a1aa]">
              TODO: Connect to Supabase to display competition entries and social media content
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

