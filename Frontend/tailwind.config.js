/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#ffffff",
        "bg-alt": "#f8fafc",
        surface: "#f1f5f9",
        border: "#e2e8f0",
        text: "#1e293b",
        "text-secondary": "#64748b",
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
