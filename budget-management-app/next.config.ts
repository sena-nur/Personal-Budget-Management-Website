/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  // Add this configuration to suppress hydration warnings
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Add this to handle Grammarly extension attributes
  compiler: {
    styledComponents: true,
    // Ignore specific data attributes that cause hydration mismatches
    reactRemoveProperties:
      process.env.NODE_ENV === "production"
        ? {
            properties: ["^data-gr-", "^data-new-gr-"],
          }
        : undefined,
  },
};

module.exports = nextConfig;
