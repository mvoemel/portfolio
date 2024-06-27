/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview (for LinkPreview.tsx)
    ],
  },
  // TODO: Configure Next.js build options for only client-side rendering. Change in future when server-side rendering is implemented.
  // output: "export",
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
};

export default nextConfig;
