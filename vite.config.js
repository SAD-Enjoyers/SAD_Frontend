// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://thetechverse.ir:3000/api/", // General backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/signuppage": {
        target: "http://localhost:3000/api/", // Address for signup
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/signuppage/, ""), // Adjust path as needed
      },
      "/forgetPassword": {
        target: "http://localhost:3000/api/", // Address for forgetPassword
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/forgetPassword/, ""), // Adjust path as needed
      },
    },
  },
});
