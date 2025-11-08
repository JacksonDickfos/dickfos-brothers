import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for Dickfos Brothers",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0C]">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-[#0B0B0C]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-8">Terms of Use</h1>
            <div className="prose prose-invert max-w-none space-y-6 text-[#a1a1aa]">
              <p className="text-sm text-[#a1a1aa]">Last updated: {new Date().toLocaleDateString()}</p>
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-4 text-white">Acceptance of Terms</h2>
                <p>
                  By accessing and using this website, you accept and agree to be bound by these Terms of Use.
                </p>
              </div>
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-4 text-white">Competitions</h2>
                <p>
                  All competitions are subject to their specific rules and terms. By entering, you agree 
                  to comply with all applicable rules and regulations.
                </p>
              </div>
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-4 text-white">Content</h2>
                <p>
                  All content on this site is the property of Dickfos Brothers. 
                  Unauthorized use is prohibited.
                </p>
              </div>
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-4 text-white">Contact Us</h2>
                <p>
                  If you have questions about these Terms, please contact us at{" "}
                  <a href="mailto:hello@resemblance.studio" className="text-[#6EE7F9] hover:underline">
                    hello@resemblance.studio
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

