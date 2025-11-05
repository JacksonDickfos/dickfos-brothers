"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#111215] border-t border-[#1A1B1F] p-4 shadow-lg"
      >
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-[#a1a1aa]">
              We use cookies to enhance your experience and analyze site usage. By continuing, you agree to our{" "}
              <a href="/privacy" className="text-[#6EE7F9] hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="rounded-full bg-[#6EE7F9] px-6 py-2 text-sm font-semibold text-[#0B0B0C] hover:bg-[#6EE7F9]/90 transition-colors"
            >
              Accept
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 text-[#a1a1aa] hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

