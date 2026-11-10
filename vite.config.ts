import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This repository is served from a project subpath on GitHub Pages.
  base: '/edgardopinto/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})
