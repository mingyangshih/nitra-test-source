// Plugins
import Components from "unplugin-vue-components/vite";
import Vue from "@vitejs/plugin-vue";
import mockServer from "vite-plugin-mock-server";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import ViteFonts from "unplugin-fonts/vite";
import VueRouter from "unplugin-vue-router/vite";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    Vue({
      template: { transformAssetUrls },
    }),
    mockServer({
      log: true,
      delay: 1000,
      mockDir: "mock",
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss",
      },
    }),
    Components(),
    ViteFonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900",
          },
        ],
      },
    }),
  ],
  base: "/nitra-test/",
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 3000,
    // https://israynotarray.com/nodejs/20230407/1216067379/
    proxy: {
      "^/api/.*": {
        target: "http://partners.mythicalmagicalmedia.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\//, "/api/"),
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log(
              "Sending Request to the Target:",
              options.target + proxyReq.path
            );
          });
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler",
      },
    },
  },
});
