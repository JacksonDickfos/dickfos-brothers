import Link from "next/link";
import { SITE } from "@/lib/siteConfig";

// Ensure this is a server component
export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl md:text-7xl">
              {SITE.name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400 sm:text-xl">
              Welcome to our home. Explore our series, episodes, and more.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/series"
                className="rounded-full bg-black px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                View Series
              </Link>
              <Link
                href="/about"
                className="text-base font-semibold leading-6 text-zinc-900 dark:text-zinc-100"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Features/Content Sections */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
              What We Offer
            </h2>
            <p className="mt-2 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Discover our content and engage with our community.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col rounded-2xl bg-zinc-50 p-8 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-black dark:text-white">
                Series
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Browse our collection of series and discover new content.
              </p>
              <Link
                href="/series"
                className="mt-6 text-sm font-semibold leading-6 text-black dark:text-white"
              >
                Explore → <span aria-hidden="true"></span>
              </Link>
            </div>
            <div className="flex flex-col rounded-2xl bg-zinc-50 p-8 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-black dark:text-white">
                Episodes
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Watch our latest episodes and catch up on what you missed.
              </p>
              <Link
                href="/episodes"
                className="mt-6 text-sm font-semibold leading-6 text-black dark:text-white"
              >
                Watch Now → <span aria-hidden="true"></span>
              </Link>
            </div>
            <div className="flex flex-col rounded-2xl bg-zinc-50 p-8 dark:bg-zinc-900">
              <h3 className="text-xl font-semibold text-black dark:text-white">
                Newsletter
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Stay updated with our latest news and announcements.
              </p>
              <Link
                href="/newsletter"
                className="mt-6 text-sm font-semibold leading-6 text-black dark:text-white"
              >
                Subscribe → <span aria-hidden="true"></span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
