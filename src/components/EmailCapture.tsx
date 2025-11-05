"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-[#111215] py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Get the weekly drop
          </h2>
          <p className="text-[#a1a1aa] mb-8 max-w-2xl mx-auto">
            Behind-the-scenes, challenges, and giveaways. Join our newsletter.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 rounded-full bg-[#0B0B0C] border border-[#1A1B1F] px-6 py-3 text-white placeholder-[#a1a1aa] focus:outline-none focus:ring-2 focus:ring-[#6EE7F9]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-[#6EE7F9] px-6 py-3 text-[#0B0B0C] font-semibold transition-all hover:bg-[#6EE7F9]/90 disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
            </button>
          </form>
          {status === "success" && (
            <p className="mt-4 text-sm text-[#6EE7F9]">Thanks for subscribing!</p>
          )}
          {status === "error" && (
            <p className="mt-4 text-sm text-red-400">Something went wrong. Please try again.</p>
          )}
          <p className="mt-4 text-xs text-[#a1a1aa]">
            By subscribing, you agree to our{" "}
            <a href="/privacy" className="text-[#6EE7F9] hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}

