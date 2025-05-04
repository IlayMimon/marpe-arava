import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => {
          if (path.toLowerCase().startsWith('/_api/web')) {
            return path;
          }

          return `/_api/web/${path.startsWith('/') ? path.slice(1) : path}`;
        },
      },
    },
  },
});
