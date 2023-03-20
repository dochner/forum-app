import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Inspect from "vite-plugin-inspect";
import Inspector from "vite-plugin-vue-inspector";
import Unocss from "unocss/vite";
import VueI18n from "@intlify/unplugin-vue-i18n/vite";
import VueMacros from "unplugin-vue-macros/vite";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    resolve: {
      alias: {
        "~/": `${path.resolve(__dirname, "src")}/`,
      },
    },
    plugins: [
      VueMacros({
        plugins: {
          vue: Vue({
            reactivityTransform: true,
          }),
        },
      }),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages(),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          "vue-i18n",
          "vue/macros",
          "@vueuse/head",
          "@vueuse/core",
        ],
        dts: "src/auto-imports.d.ts",
        dirs: ["src/composables", "src/stores", "src/utils"],
        vueTemplate: true,
      }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: true,
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),

      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: [path.resolve(__dirname, "locales/**")],
      }),

      // https://github.com/antfu/vite-plugin-inspect
      // Visit http://localhost:3333/__inspect/ to see the inspector
      Inspect(),

      // https://github.com/webfansplz/vite-plugin-vue-inspector
      Inspector({
        toggleButtonVisibility: "never",
      }),
    ],

    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_APP_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  });
};
