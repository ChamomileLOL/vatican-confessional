import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Vatican Confessional',
        short_name: 'Confess',
        description: 'Strict Equality Global Penance Tracker',
        theme_color: '#020617', // Slate-950
        background_color: '#020617',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png', // We will assume these exist or default
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
});