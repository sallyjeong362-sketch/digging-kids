import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this app from a /digging-kids/ subpath; Vercel (and most
// other static hosts) serve it from the domain root. Vercel sets VERCEL=1
// during its build, so this picks the right base automatically either way.
const base = process.env.VERCEL ? '/' : '/digging-kids/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
