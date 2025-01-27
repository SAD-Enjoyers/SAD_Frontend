// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/signuppage": {
        target: "http://localhost:3000", // Localhost backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/signuppage/, "/api"), // Rewrite to match the backend route
      },
      "/forgetPassword": {
        target: "http://localhost:3000", // Localhost backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/forgetPassword/, "/api"), // Rewrite to match the backend route
      },
      "/api": {
        target: "http://thetechverse.ir:3000/api/", // General backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api/v1/auth/signup": {
//         target: "http://91.132.50.155:3000", // Localhost for the signup route
//         changeOrigin: true,
//         rewrite: (path) =>
//           path.replace(/^\/api\/v1\/auth\/signup/, "/v1/auth/signup"),
//       },
//       "/api": {
//         target: "http://thetechverse.ir:3000/api/", // General backend URL
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
// });
