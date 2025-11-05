import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EmailCapture } from "@/components/EmailCapture";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Subscribe to our newsletter for behind-the-scenes content, challenges, and giveaways.",
};

export default function NewsletterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0C]">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-[#0B0B0C]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-center">
              Newsletter
            </h1>
            <p className="text-center text-[#a1a1aa] mb-12 max-w-2xl mx-auto">
              Get the weekly drop — behind-the-scenes, challenges, and giveaways.
            </p>
            <EmailCapture />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

