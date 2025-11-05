import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { 
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: { remarkPlugins: [], rehypePlugins: [] },
});

export default withMDX(nextConfig);
