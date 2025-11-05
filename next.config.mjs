import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { 
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Ensure app directory is properly configured
  // Vercel should auto-detect this, but being explicit helps
};

const withMDX = createMDX({
  options: { remarkPlugins: [], rehypePlugins: [] },
});

export default withMDX(nextConfig);
