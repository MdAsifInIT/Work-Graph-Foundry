import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const defaultBasePath = "/";

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? defaultBasePath,
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: `http://127.0.0.1:${process.env.SAMRUNA_BACKEND_PORT ?? "8787"}`,
        changeOrigin: true
      }
    }
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts"
  }
});
