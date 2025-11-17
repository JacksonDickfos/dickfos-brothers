"use client";

import { Instagram } from "lucide-react";
import { motion } from "framer-motion";

interface SocialPost {
  id: string;
  type: "instagram" | "tiktok";
  thumbnail: string;
  url: string;
  caption?: string;
}

interface SocialWallProps {
  posts?: SocialPost[];
  mode?: "static" | "server" | "embed";
  showOnly?: "instagram" | "tiktok";
}

// Mock data for development
const mockInstagramPosts: SocialPost[] = Array.from({ length: 6 }, (_, i) => ({
  id: `ig-${i + 1}`,
  type: "instagram",
  thumbnail: `https://picsum.photos/400/400?random=${i + 1}`,
  url: "https://instagram.com/p/example",
  caption: `Instagram post ${i + 1}`,
}));

const mockTikTokPosts: SocialPost[] = Array.from({ length: 6 }, (_, i) => ({
  id: `tt-${i + 1}`,
  type: "tiktok",
  thumbnail: `https://picsum.photos/400/400?random=${i + 10}`,
  url: "https://tiktok.com/@dickfosbrothers",
  caption: `TikTok video ${i + 1}`,
}));

export function SocialWall({ posts, mode = "static", showOnly }: SocialWallProps) {
  // Use mock data if no posts provided
  const instagramPosts = posts?.filter((p) => p.type === "instagram") || mockInstagramPosts;
  const tiktokPosts = posts?.filter((p) => p.type === "tiktok") || mockTikTokPosts;
  
  const showInstagram = !showOnly || showOnly === "instagram";
  const showTikTok = !showOnly || showOnly === "tiktok";

  const handleShare = async (url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Dickfos Brothers",
          url,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(url);
      // TODO: Show toast notification
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Instagram Section */}
      {showInstagram && (
        <div className={showTikTok ? "mb-16" : ""}>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 text-center">
            Latest from Instagram
          </h2>
          <p className="text-center text-[#a1a1aa] mb-8">
            Follow @dickfosbrothers on Instagram
          </p>
          {mode === "static" && (
            <p className="text-center text-xs text-[#a1a1aa] mb-8">
              TODO: Add INSTAGRAM_ACCESS_TOKEN to environment variables to fetch real posts
            </p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative aspect-square rounded-lg overflow-hidden bg-[#111215] border border-[#1A1B1F] hover:border-[#6EE7F9] transition-colors"
              >
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full w-full"
                >
                  <img
                    src={post.thumbnail}
                    alt={post.caption || "Instagram post"}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <Instagram
                      size={24}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-white"
                    />
                  </div>
                </a>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleShare(post.url);
                  }}
                  className="absolute top-2 right-2 p-2 rounded-full bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Share post"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-white"
                  >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* TikTok Section */}
      {showTikTok && (
        <div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 text-center">
            Latest from TikTok
          </h2>
          <p className="text-center text-[#a1a1aa] mb-8">
            Follow @dickfosbrothers on TikTok
          </p>
          {mode === "static" && (
            <p className="text-center text-xs text-[#a1a1aa] mb-8">
              TODO: Add TIKTOK_ACCESS_TOKEN to environment variables to fetch real videos
            </p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tiktokPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative aspect-[9/16] rounded-lg overflow-hidden bg-[#111215] border border-[#1A1B1F] hover:border-[#A78BFA] transition-colors"
              >
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full w-full"
                >
                  <img
                    src={post.thumbnail}
                    alt={post.caption || "TikTok video"}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-white"
                    >
                      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.2 3.07.41 4.59s.52 3.02.84 4.52c.36 1.75.83 3.48 1.47 5.15.64 1.67 1.46 3.27 2.49 4.75.95 1.36 2.06 2.62 3.35 3.72.94.8 1.99 1.5 3.15 2.06.26.13.54.24.82.33.56.19 1.14.31 1.73.38.59.07 1.19.08 1.79.04.6-.04 1.19-.13 1.77-.26.58-.13 1.15-.3 1.7-.51.55-.2 1.08-.44 1.59-.72.51-.27 1-.58 1.46-.92.46-.34.9-.72 1.31-1.13.41-.41.79-.85 1.13-1.31.34-.46.65-.95.92-1.46.27-.51.51-1.04.72-1.59.2-.55.38-1.12.51-1.7.13-.58.22-1.17.26-1.77.04-.6.03-1.2-.04-1.79-.07-.59-.19-1.17-.38-1.73-.09-.28-.2-.56-.33-.82-.56-1.16-1.26-2.21-2.06-3.15-1.1-1.29-2.36-2.4-3.72-3.35-1.48-1.03-3.08-1.85-4.75-2.49-1.67-.64-3.4-1.11-5.15-1.47-1.5-.32-3-.56-4.52-.84-1.52-.21-3.06-.33-4.59-.41C3.07.2 1.53.08 0 .02v12.56h12.53z" />
                    </svg>
                  </div>
                </a>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleShare(post.url);
                  }}
                  className="absolute top-2 right-2 p-2 rounded-full bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Share video"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-white"
                  >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

