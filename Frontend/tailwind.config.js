/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#c8d8e8",
        "bg-alt": "#d4e0ec",
        surface: "#ffffff",
        border: "#b8ccd8",
        text: "#0f172a",
        "text-secondary": "#334155",
        accent: "#0d9488",
        "accent-hover": "#0f766e",
        "accent-light": "#ccfbf1",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
