/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {

      colors: {
        primary: "#050816",
        secondary: "#0B1120",
        glass: "rgba(255,255,255,0.05)",
      },

      backgroundImage: {

        heroGradient:
          "radial-gradient(circle at top left, rgba(59,130,246,0.15), transparent 30%), radial-gradient(circle at bottom right, rgba(236,72,153,0.15), transparent 30%), linear-gradient(to bottom, #050816, #0B1120)",

        buttonGradient:
          "linear-gradient(135deg,#3b82f6,#8b5cf6)",

        cardGradient:
          "linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))",
      },

      boxShadow: {
        neon:
          "0 0 30px rgba(59,130,246,0.35)",

        pink:
          "0 0 30px rgba(236,72,153,0.25)",
      },
    },
  },

  plugins: [],
};