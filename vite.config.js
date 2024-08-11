import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: {
      path: 'path-browserify',
      events: 'eventemitter3',
    },
  },
  plugins: [react()],
});
