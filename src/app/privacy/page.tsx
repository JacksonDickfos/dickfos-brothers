import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Dickfos Brothers",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0C]">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-[#0B0B0C]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-8">Privacy Policy</h1>
            <div className="prose prose-invert max-w-none space-y-6 text-[#a1a1aa]">
              <p className="text-sm text-[#a1a1aa]">Last updated: {new Date().toLocaleDateString()}</p>
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-4 text-white">Information We Collect</h2>
                <p>
                  We collect information that you provide directly to us, including when you subscribe 
                  to our newsletter, enter competitions, or contact us.
                </p>
              </div>
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-4 text-white">How We Use Your Information</h2>
                <p>
                  We use the information we collect to send you newsletters, manage competitions, 
                  and respond to your inquiries.
                </p>
              </div>
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-4 text-white">Cookies</h2>
                <p>
                  We use cookies to improve your experience on our site. You can manage cookie 
                  preferences through your browser settings.
                </p>
              </div>
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-4 text-white">Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at{" "}
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

