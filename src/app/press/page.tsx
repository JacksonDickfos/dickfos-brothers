import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import { SITE } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Press Kit",
  description: "Press kit and media resources for Dickfos Brothers",
};

export default function PressPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0C]">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-[#0B0B0C]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-8">Press Kit</h1>

            <div className="space-y-12">
              {/* Bio */}
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-4">Bio</h2>
                <p className="text-[#a1a1aa] leading-relaxed">
                  Dickfos Brothers features two brothers with identical DNA but contrasting personalities. 
                  Through weekly challenges, experiments, and competitions, we explore the differences and 
                  similarities that emerge from our shared foundation.
                </p>
              </div>

              {/* Fast Facts */}
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-4">Fast Facts</h2>
                <ul className="space-y-2 text-[#a1a1aa]">
                  <li>• Brand: {SITE.name}</li>
                  <li>• Tagline: {SITE.tagline}</li>
                  <li>• Instagram: {SITE.social.instagram}</li>
                  <li>• TikTok: {SITE.social.tiktok}</li>
                  <li>• Contact: {SITE.email}</li>
                </ul>
              </div>

              {/* Logos */}
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-4">Logos & Assets</h2>
                <p className="text-[#a1a1aa] mb-4">
                  Logo assets and brand guidelines coming soon.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-lg bg-[#111215] border border-[#1A1B1F] flex items-center justify-center text-[#a1a1aa]">
                    Logo Placeholder
                  </div>
                  <div className="aspect-square rounded-lg bg-[#111215] border border-[#1A1B1F] flex items-center justify-center text-[#a1a1aa]">
                    Logo Placeholder
                  </div>
                </div>
              </div>

              {/* Approved Photos */}
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-4">Approved Photos</h2>
                <p className="text-[#a1a1aa] mb-4">
                  Photo assets coming soon.
                </p>
              </div>

              {/* Media Contact */}
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-4">Media Inquiries</h2>
                <p className="text-[#a1a1aa] mb-4">
                  For media inquiries, please contact us at{" "}
                  <a href={`mailto:${SITE.email}`} className="text-[#6EE7F9] hover:underline">
                    {SITE.email}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

