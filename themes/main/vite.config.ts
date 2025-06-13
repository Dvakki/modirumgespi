// themes/your-theme/vite.config.ts
import { defineConfig } from "vite";
import { resolve, basename } from "path";

// Your JS/TS/CSS entrypoints.
const input = {
    main: resolve(__dirname, "assets/js/main.js"),
    css: resolve(__dirname, "assets/scss/main.scss"),
    app: resolve(__dirname, "assets/css/app.css"),
    base: resolve(__dirname, "assets/scss/base.scss"),
};

// Auto detect the theme name, works only if one theme is available.
const themeName = "main";

// Determine if we are in production or development mode
const isProduction = process.env.NODE_ENV != "production";

export default defineConfig({
    // Included assets will use this path as the base URL.
    base: `/themes/${themeName}/assets/build/`,
    build: {
        rollupOptions: {
            input,
            // assetsInlineLimit: 4000,
            // output: {
            //     assetFileNames: (assetInfo) => {
            //         if (assetInfo.name.endsWith('.css')) {
            //           return 'css/[name].[hash][extname]';
            //         }
            //         if (assetInfo.name.endsWith('.woff') || assetInfo.name.endsWith('.woff2')) {
            //           return 'somedir/fonts/[name].[hash][extname]';
            //         }
            //         return 'assets/[name].[hash][extname]';
            //     },
            // },
        },
        manifest: true,
        emptyOutDir: true,
        // Output assets to /themes/main/assets/build
        outDir: resolve(__dirname, "assets/build"),
    },
    css: {
        postcss: {
            plugins: [
                require("postcss-import"),
                require("tailwindcss"),
                require("autoprefixer"),
            ],
        },
    },
    server: {
        hmr: {
            // Do not use encrypted connections for the HMR websocket.
            protocol: "ws",
        },
    },
});
