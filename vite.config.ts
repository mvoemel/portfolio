import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-gsap": ["gsap", "@gsap/react"],
          "vendor-maps": ["d3-geo"],
          "vendor-markdown": ["react-markdown", "react-syntax-highlighter"],
          "vendor-ui": ["clsx", "tailwind-merge", "lucide-react", "react-tooltip"],
          "vendor-state": ["zustand", "immer"],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});
