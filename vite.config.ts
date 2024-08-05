import { defineConfig, splitVendorChunkPlugin } from "vite";
import legacy from "@vitejs/plugin-legacy";
import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import image from "@rollup/plugin-image";

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    image(),
    splitVendorChunkPlugin(),
    legacy({
      targets: ["defaults", "not IE 11"]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      lodash: "lodash-es"
    }
  },
  server: {
    port: 3000
  },
  build: {
    outDir: "dist",
    assetsDir: "static",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    modulePreload: {
      polyfill: true
    },
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name].[hash:12].chunk.js",
        entryFileNames: "static/js/[name].[hash:12].js",
        assetFileNames: (info) => {
          if (["css", "sass", "scss"].some((ext) => info.name?.endsWith("." + ext))) {
            return "static/css/[name].[hash:12].[ext]";
          }

          if (["png", "jpg", "jpeg", "gif", "svg"].some((ext) => info.name?.endsWith("." + ext))) {
            return "static/img/[name].[hash:12].[ext]";
          }

          return "static/media/[name].[hash:12].[ext]";
        }
      }
    }
  }
});
