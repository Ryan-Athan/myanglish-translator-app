import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Remove external modules so that they are bundled
      // external: ['@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons']
    }
  }
});
