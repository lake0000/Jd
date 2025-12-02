import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/你的仓库名/', // 例如仓库叫 my-portfolio，这里就填 '/my-portfolio/'
})
