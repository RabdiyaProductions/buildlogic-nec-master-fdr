import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: repo name must match GitHub repo exactly
// https://rabdiyaproductions.github.io/buildlogic-nec-master-fdr/
export default defineConfig({
  plugins: [react()],
  base: "/buildlogic-nec-master-fdr/",
});
