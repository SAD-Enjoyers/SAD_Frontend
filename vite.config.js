import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://91.107.142.37:3000/api/", // your backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // adjust based on your API endpoint
      },
    },
  },
});
