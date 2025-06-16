import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  fontFamily: {
  sans: ['Inter', 'sans-serif'],
  mono: ['Fira Code', 'monospace'],
  display: ['Audiowide', 'cursive'],
}

})