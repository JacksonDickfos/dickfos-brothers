export const SITE = {
  name: "Dickfos Brothers",
  tagline: "Two brothers. One brand. Same DNA, different decisions.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dickfos-brothers.vercel.app",
  instagram: "https://instagram.com/dickfosbrothers",
  tiktok: "https://tiktok.com/@dickfosbrothers",
  email: "hello@resemblance.studio",
  social: {
    instagram: "@dickfosbrothers",
    tiktok: "@dickfosbrothers",
  },
} as const;

export function getCurrentYear() {
  return new Date().getFullYear();
}
