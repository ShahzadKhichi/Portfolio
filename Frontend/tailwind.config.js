/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",     // blue-500
        secondary: "#60a5fa",   // blue-400
        accent: "#06b6d4",      // cyan-500
        background: "#0f172a", // slate-900
        surface: "#1e293b",     // slate-800
        "text-primary": "#f1f5f9", // slate-100
        "text-secondary": "#cbd5e1", // slate-300
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(59, 130, 246, 0.4)',
        card: '0 10px 30px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #3b82f6, #60a5fa)',
      }
    },
  },
  plugins: [],
}
