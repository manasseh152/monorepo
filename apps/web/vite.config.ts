import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import { resolve } from 'path';

import Tailwindcss from '@tailwindcss/vite';
import React from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        Tailwindcss(),
        TanStackRouterVite(),
        React(),
        VitePWA({
            registerType: 'prompt',
            injectRegister: false,

            pwaAssets: {
                disabled: false,
                config: true,
            },

            manifest: {
                name: 'TanStack PWA Template',
                short_name: 'TanStack PWA',
                description:
                    'A template for building a PWA with TanStack and Vite.',
                theme_color: '#12b594',
            },

            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
                cleanupOutdatedCaches: true,
                clientsClaim: true,
            },

            devOptions: {
                enabled: false,
                navigateFallback: 'index.html',
                suppressWarnings: true,
                type: 'module',
            },
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
        // conditions: ['source'],
    },
    /* I prefer to the environment variables in the .env file. */
    server: {
        host: 'localhost',
        port: 5173,
        proxy: {
            /* Only for testcasing the template */
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
