import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_API_BASE_URL': JSON.stringify(env.REACT_APP_API_BASE_URL),
      'process.env.REACT_APP_SALT': JSON.stringify(env.REACT_APP_SALT),
    },
    plugins: [react()],
    server: {
      port: 3001
    }
  }
})