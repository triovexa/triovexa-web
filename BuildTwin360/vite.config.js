import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const repoBase =
  process.env.GITHUB_ACTIONS &&
  process.env.GITHUB_REPOSITORY &&
  !process.env.GITHUB_REPOSITORY.endsWith('.github.io')
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/'

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || repoBase,
})
