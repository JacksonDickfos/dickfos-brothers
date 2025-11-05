export const SITE = {
  name: "Dickfos Brothers",
  parentCompany: "Resemblance",
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

export const series = [
  {
    slug: "brother-vs-brother",
    title: "Brother vs Brother",
    tagline: "Weekly challenges, loser does the dare.",
    featured: true,
    cover: "/images/series/brother-vs-brother.jpg",
    ctaText: "Watch the latest",
    ctaHref: "https://instagram.com/dickfosbrothers",
  },
  {
    slug: "same-dna-test",
    title: "Same DNA Test",
    tagline: "7-day split experiments.",
    featured: true,
    cover: "/images/series/same-dna-test.jpg",
    ctaText: "Watch the latest",
    ctaHref: "https://instagram.com/dickfosbrothers",
  },
  {
    slug: "resemblance-experiments",
    title: "Resemblance Experiments",
    tagline: "Swap lives, habits, roles.",
    featured: false,
    cover: "/images/series/resemblance-experiments.jpg",
    ctaText: "Watch the latest",
    ctaHref: "https://instagram.com/dickfosbrothers",
  },
  {
    slug: "brother-business-pitch",
    title: "The Brother Business Pitch",
    tagline: "60-sec invest/reject.",
    featured: false,
    cover: "/images/series/brother-business-pitch.jpg",
    ctaText: "Watch the latest",
    ctaHref: "https://instagram.com/dickfosbrothers",
  },
  {
    slug: "sibling-mind-sync",
    title: "Sibling Mind Sync",
    tagline: "Guessing games.",
    featured: false,
    cover: "/images/series/sibling-mind-sync.jpg",
    ctaText: "Watch the latest",
    ctaHref: "https://instagram.com/dickfosbrothers",
  },
  {
    slug: "dickfos-dilemma",
    title: "The Dickfos Dilemma",
    tagline: "Micro debates.",
    featured: false,
    cover: "/images/series/dickfos-dilemma.jpg",
    ctaText: "Watch the latest",
    ctaHref: "https://instagram.com/dickfosbrothers",
  },
  {
    slug: "resemblance-roadmap",
    title: "Resemblance Roadmap",
    tagline: "Building the parent company.",
    featured: false,
    cover: "/images/series/resemblance-roadmap.jpg",
    ctaText: "Watch the latest",
    ctaHref: "https://instagram.com/dickfosbrothers",
  },
] as const;

export function getCurrentYear() {
  return new Date().getFullYear();
}
