// Plugins
import vue from "@vitejs/plugin-vue"
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify"

import tailwind from "tailwindcss"

// Utilities
import { defineConfig } from "vite"
import { fileURLToPath, URL } from "node:url"

// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    root: process.cwd(),
    server: {
        hmr: {
            enabled: true,
            timeout: 3000,
        },
    },
    plugins: [
        vue({
            template: { transformAssetUrls },
        }),
        // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
        vuetify({
            autoImport: true,
            styles: {
                configFile: "src/styles/settings.scss",
            },
        }),
    ],

    define: { "process.env": {} },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
        extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
    optimizeDeps: {
        include: ["@fawmi/vue-google-maps", "fast-deep-equal"],
    },
})
