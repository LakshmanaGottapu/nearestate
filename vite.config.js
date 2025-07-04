import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  build: {
    rollupOptions: {
      external: [
        '@babel/runtime',
        '@babel/runtime/helpers/esm/extends',
        // Add any other babel runtime helpers that might cause issues
      ],
    }
  }
})
