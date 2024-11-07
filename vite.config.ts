import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://nationalmuseum2.somee.com',  // Redirige las solicitudes /api al backend
    },
  },
});
