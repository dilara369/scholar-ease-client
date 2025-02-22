/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        background: "#F9FAFB",
        text: "#1F2937",
        primary: "#2563EB",
        secondary: "#10B981",
      },
      animation: {
        "spin-reverse": "spin 2s linear reverse",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
