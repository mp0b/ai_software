/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nyron: {
          bg: "#08090d",
          sidebar: "#06070a",
          border: "#151821",
          card: "#0d1017",
          panel: "#10131c",
          blue: "#0091ff",
          "blue-hover": "#0080e6",
          green: "#22c55e",
          red: "#ef4444",
          amber: "#d97706",
          gray: {
            100: "#f1f5f9",
            200: "#e2e8f0",
            300: "#cbd5e1",
            400: "#94a3b8",
            500: "#64748b",
            600: "#475569",
            700: "#334155",
            800: "#1e293b",
            900: "#0f172a",
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
