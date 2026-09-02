import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' 让构建产物使用相对路径，
// 部署到 GitHub Pages 的任意路径（username.github.io 或 username.github.io/repo）都能正常工作。
export default defineConfig({
  plugins: [react()],
  base: './',
})
