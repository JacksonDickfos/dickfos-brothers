"use client";

import { useState } from "react";

type InquiryType = "sponsorship" | "collaboration" | "media";

interface ContactFormProps {
  inquiryType: InquiryType;
}

export function ContactForm({ inquiryType }: ContactFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, inquiryType }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[#6EE7F9]/80 mb-2">Request Type</p>
        <p className="text-2xl font-heading text-white capitalize">{inquiryType}</p>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full rounded-lg bg-[#111215] border border-[#1A1B1F] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6EE7F9]"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-lg bg-[#111215] border border-[#1A1B1F] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6EE7F9] resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-[#6EE7F9] px-6 py-3 text-[#0B0B0C] font-semibold transition-all hover:bg-[#6EE7F9]/90 disabled:opacity-50"
      >
        {status === "loading" ? "Submitting..." : status === "success" ? "Submitted!" : "Submit Request"}
      </button>

      {status === "success" && (
        <p className="text-center text-sm text-[#6EE7F9]">Thanks! We'll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-center text-sm text-red-400">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

