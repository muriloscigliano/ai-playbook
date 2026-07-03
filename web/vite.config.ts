import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Static SPA — deployable to Pages/Netlify, no backend.
// `base` can be overridden at build time (e.g. for GitHub Pages subpaths):
//   BASE=/ai-playbook/ pnpm --filter web build
export default defineConfig({
  plugins: [vue()],
  base: process.env.BASE || '/',
  build: {
    target: 'es2020',
    outDir: 'dist',
  },
})
