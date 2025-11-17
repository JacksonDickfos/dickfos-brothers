"use client";

import { useState } from "react";
import { ContactForm } from "./ContactForm";

type InquiryType = "sponsorship" | "collaboration" | "media";

const OPTIONS: Array<{
  emoji: string;
  title: string;
  description: string;
  value: InquiryType;
}> = [
  {
    emoji: "💼",
    title: "Sponsorship",
    description: "Campaign partnerships, brand deals, and activations",
    value: "sponsorship",
  },
  {
    emoji: "🤝",
    title: "Collaboration",
    description: "Co-created content, ventures, and strategic alliances",
    value: "collaboration",
  },
  {
    emoji: "🎤",
    title: "Media",
    description: "Press, appearances, and speaking opportunities",
    value: "media",
  },
];

export function WorkWithUsSection() {
  const [selected, setSelected] = useState<InquiryType>("sponsorship");

  return (
    <section id="work" className="py-16 bg-[#0B0B0C] scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Work With Us
          </h2>
        </div>

        <p className="text-center text-sm uppercase tracking-[0.3em] text-[#6EE7F9]/80 mb-6">
          Select Your Inquiry Type
        </p>
        <div className="grid gap-6 md:grid-cols-3 mb-12" role="radiogroup" aria-label="Select inquiry type">
          {OPTIONS.map((option) => {
            const isActive = option.value === selected;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelected(option.value)}
                role="radio"
                aria-checked={isActive}
                className={`rounded-3xl border border-[#1A1B1F] bg-gradient-to-br from-[#0f172a] via-[#0c1220] to-[#090c16] p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center transition-all cursor-pointer hover:border-[#6EE7F9]/60 hover:shadow-[0_25px_60px_rgba(110,231,249,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6EE7F9] ${
                  isActive ? "border-[#6EE7F9] shadow-[0_25px_60px_rgba(110,231,249,0.25)]" : ""
                }`}
              >
                <div className="text-4xl mb-6">{option.emoji}</div>
                <h3 className="text-2xl font-heading font-semibold text-white mb-3">
                  {option.title}
                </h3>
                <p className="text-[#c3c3d1]">{option.description}</p>
              </button>
            );
          })}
        </div>

        <div className="mx-auto max-w-3xl w-full">
          <ContactForm inquiryType={selected} />
        </div>
      </div>
    </section>
  );
}

