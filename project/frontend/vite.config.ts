import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: '.', // ใช้โฟลเดอร์ปัจจุบัน (frontend) เป็น root
  plugins: [react()],
  build: {
    outDir: 'dist', // ✅ build ออกไปที่ frontend/dist
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // src อยู่ใน frontend/
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
