/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.microlink.io", port: "" }, // Microlink Image Preview (for LinkPreview.tsx)
    ],
  },
  output: "standalone",
};

export default nextConfig;
