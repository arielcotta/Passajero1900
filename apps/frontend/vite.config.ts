import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // Permite acceso desde cualquier dispositivo en la red
    port: 8854,
    proxy: {
      '/api': {
        target: 'http://localhost:9267',
        changeOrigin: true,
      },
    },
  },
});
