"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

const entrySchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  instagramHandle: z.string().optional(),
  tiktokHandle: z.string().optional(),
  caption: z.string().min(1, "Caption is required"),
  mediaFile: z.instanceof(File).optional(),
  termsAccepted: z.boolean().refine((val) => val === true, "You must accept the terms"),
});

type EntryFormData = z.infer<typeof entrySchema>;

interface CompetitionEntryFormProps {
  competitionId: string;
  competitionSlug: string;
}

export function CompetitionEntryForm({ competitionId, competitionSlug }: CompetitionEntryFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [shareUrl, setShareUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EntryFormData>({
    resolver: zodResolver(entrySchema),
  });

  const onSubmit = async (data: EntryFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("competitionId", competitionId);
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      if (data.instagramHandle) formData.append("instagramHandle", data.instagramHandle);
      if (data.tiktokHandle) formData.append("tiktokHandle", data.tiktokHandle);
      formData.append("caption", data.caption);
      if (data.mediaFile) formData.append("mediaFile", data.mediaFile);
      formData.append("termsAccepted", "true");

      const response = await fetch(`/api/competitions/${competitionSlug}/enter`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setShareUrl(result.shareUrl || "");
        reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to submit entry");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("An unexpected error occurred");
    }
  };

  const handleShare = async () => {
    if (navigator.share && shareUrl) {
      try {
        await navigator.share({
          title: "Check out my entry!",
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled
      }
    } else if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      // TODO: Show toast
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-[#111215] border border-[#6EE7F9] p-8 text-center"
      >
        <h3 className="font-heading text-2xl font-semibold mb-4 text-[#6EE7F9]">
          Entry Submitted!
        </h3>
        <p className="text-[#a1a1aa] mb-6">
          Thanks for entering! We'll review your submission and feature it in the gallery if selected.
        </p>
        {shareUrl && (
          <button
            onClick={handleShare}
            className="inline-flex items-center rounded-full bg-[#6EE7F9] px-6 py-3 text-[#0B0B0C] font-semibold hover:bg-[#6EE7F9]/90"
          >
            Share Your Entry
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <div className="rounded-2xl bg-[#111215] border border-[#1A1B1F] p-8">
      <h2 className="font-heading text-2xl font-semibold mb-6">Enter Now</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            {...register("fullName")}
            className="w-full rounded-lg bg-[#0B0B0C] border border-[#1A1B1F] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6EE7F9]"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-400">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full rounded-lg bg-[#0B0B0C] border border-[#1A1B1F] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6EE7F9]"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="instagramHandle" className="block text-sm font-medium mb-2">
              Instagram Handle
            </label>
            <input
              type="text"
              id="instagramHandle"
              placeholder="@username"
              {...register("instagramHandle")}
              className="w-full rounded-lg bg-[#0B0B0C] border border-[#1A1B1F] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6EE7F9]"
            />
          </div>

          <div>
            <label htmlFor="tiktokHandle" className="block text-sm font-medium mb-2">
              TikTok Handle
            </label>
            <input
              type="text"
              id="tiktokHandle"
              placeholder="@username"
              {...register("tiktokHandle")}
              className="w-full rounded-lg bg-[#0B0B0C] border border-[#1A1B1F] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6EE7F9]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="caption" className="block text-sm font-medium mb-2">
            Caption *
          </label>
          <textarea
            id="caption"
            rows={4}
            {...register("caption")}
            className="w-full rounded-lg bg-[#0B0B0C] border border-[#1A1B1F] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6EE7F9] resize-none"
            placeholder="Tell us about your entry..."
          />
          {errors.caption && (
            <p className="mt-1 text-sm text-red-400">{errors.caption.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="mediaFile" className="block text-sm font-medium mb-2">
            Media Upload (Image or Video)
          </label>
          <input
            type="file"
            id="mediaFile"
            accept="image/*,video/*"
            {...register("mediaFile")}
            className="w-full rounded-lg bg-[#0B0B0C] border border-[#1A1B1F] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6EE7F9]"
          />
          <p className="mt-1 text-xs text-[#a1a1aa]">
            Upload an image or video of your submission
          </p>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="termsAccepted"
            {...register("termsAccepted")}
            className="mt-1 mr-2"
          />
          <label htmlFor="termsAccepted" className="text-sm text-[#a1a1aa]">
            I agree to the{" "}
            <a href="/terms" className="text-[#6EE7F9] hover:underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-[#6EE7F9] hover:underline">
              Privacy Policy
            </a>
            . *
          </label>
        </div>
        {errors.termsAccepted && (
          <p className="text-sm text-red-400">{errors.termsAccepted.message}</p>
        )}

        {errorMessage && (
          <p className="text-sm text-red-400">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-full bg-[#6EE7F9] px-6 py-3 text-[#0B0B0C] font-semibold transition-all hover:bg-[#6EE7F9]/90 disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : "Submit Entry"}
        </button>
      </form>
    </div>
  );
}

