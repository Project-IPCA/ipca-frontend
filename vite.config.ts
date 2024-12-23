import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    port: 5174,
    open: true,
    hmr: true,
  },
  build: {
    sourcemap: false,
  },
});
