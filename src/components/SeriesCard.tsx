import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface SeriesCardProps {
  slug: string;
  title: string;
  tagline: string;
  cover: string;
  ctaText: string;
  ctaHref: string;
  featured?: boolean;
}

export function SeriesCard({ title, tagline, cover, ctaText, ctaHref, featured }: SeriesCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-2xl bg-[#111215] border border-[#1A1B1F]"
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        {featured && (
          <div className="absolute top-4 left-4 rounded-full bg-[#A78BFA] px-3 py-1 text-xs font-semibold text-white">
            Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-heading text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-[#a1a1aa] mb-4">{tagline}</p>
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-semibold text-[#6EE7F9] transition-colors hover:text-[#6EE7F9]/80"
        >
          {ctaText} →
        </a>
      </div>
    </motion.div>
  );
}

