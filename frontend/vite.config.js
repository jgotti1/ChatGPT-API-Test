import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../backend/public/build", // Specify the output directory for the build
    emptyOutDir: true, // Clears the output directory before building
  },
});
