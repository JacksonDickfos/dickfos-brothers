"use client";

import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    inquiryType: "sponsorship",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ email: "", message: "", inquiryType: "sponsorship" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="inquiryType" className="block text-sm font-medium mb-2">
          Inquiry Type
        </label>
        <select
          id="inquiryType"
          value={formData.inquiryType}
          onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
          className="w-full rounded-lg bg-[#111215] border border-[#1A1B1F] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6EE7F9]"
        >
          <option value="sponsorship">Sponsorship</option>
          <option value="collaboration">Collaboration</option>
          <option value="media">Media Request</option>
        </select>
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
        {status === "loading" ? "Sending..." : status === "success" ? "Sent!" : "Send Message"}
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

