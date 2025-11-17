import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SocialWall } from "@/components/SocialWall";
import { ContactForm } from "@/components/ContactForm";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dickfos Brothers | Brothers who look nothing alike",
  description: "Two brothers. One brand. Brothers who look nothing alike.",
  openGraph: {
    title: "Dickfos Brothers",
    description: "Brothers who look nothing alike 🙋🏾‍♂️🙆🏼‍♂️",
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
        <section id="home" className="flex min-h-[90vh] items-center justify-center py-20 px-4 scroll-mt-20">
          <div className="flex flex-col items-center">
            {/* Circular Logo with Gradient Border */}
            <div className="relative mb-8">
              <div className="logo-gradient-border rounded-full p-[6px]">
                <div className="rounded-full bg-[#0B0B0C] p-[4px]">
                  <div className="relative h-[512px] w-[512px] rounded-full overflow-hidden bg-[#111215]">
                    <Image
                      src="/images/logo.jpeg"
                      alt="Dickfos Brothers"
                      width={512}
                      height={512}
                      className="object-cover rounded-full w-full h-full"
                      priority
                      unoptimized
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
              Brothers who look nothing alike 🙋🏾‍♂️🙆🏼‍♂️
            </p>
          </div>
        </section>

        {/* Social Wall Section */}
        <section id="social" className="py-16 bg-[#111215] scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SocialWall mode="static" />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-[#0B0B0C] scroll-mt-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-center">
              Contact Us
            </h2>
            <p className="text-center text-[#a1a1aa] mb-8">
              Have a question or want to collaborate? Get in touch!
            </p>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
