/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0a192f",
          navyLight: "#132742",
          navyDark: "#060f1e",
          blue: "#1e56a0",
          blueLight: "#2d70c8",
          blueDark: "#154179",
          yellow: "#f59e0b",
          yellowLight: "#fbbf24",
          yellowDark: "#d97706",
          charcoal: "#1e293b",
          charcoalDark: "#0f172a",
          surface: "#f8fafc",
          surfaceAlt: "#f1f5f9"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'industrial': '0 4px 20px -2px rgba(10, 25, 47, 0.12), 0 2px 6px -1px rgba(10, 25, 47, 0.08)',
        'industrial-hover': '0 10px 25px -3px rgba(10, 25, 47, 0.18), 0 4px 10px -2px rgba(10, 25, 47, 0.12)',
        'yellow-glow': '0 0 15px rgba(245, 158, 11, 0.4)',
      }
    },
  },
  plugins: [],
}
