// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        orbitron: ['Orbitron', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        display: ['Audiowide', 'cursive'], // optional
      },
    },
  },
  plugins: [],
}
