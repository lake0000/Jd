import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 重要：把下面的 'Jd' 替换成你 GitHub 仓库的实际名字
  base: '/Jd/', 
})
