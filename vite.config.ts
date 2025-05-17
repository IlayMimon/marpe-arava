import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
    },
  },
  server: {
    proxy: {
      '/_api': 'http://localhost:3000/sites/MarpeArava',
      '^/sites/[^/]+/_api': 'http://localhost:3000',
    },
  },
});
