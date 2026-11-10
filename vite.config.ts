import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this project repository under /edgardopinto/.
  // Keep the root path for local development and Vercel deployments.
  base: process.env.GITHUB_ACTIONS ? '/edgardopinto/' : '/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})
