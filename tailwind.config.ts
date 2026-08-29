import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./lavadoras.html", "./bebedouros-e-purificadores.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          dark: "#0A141E",
          panel: "#12212F",
          light: "#F5F4F1",
          card: "#FFFFFF",
        },
        primary: {
          DEFAULT: "#00A843", // Verde Oficial Conserto Express
          hover: "#008F39",
          dark: "#062B14",
          light: "#E6F7EC",
        },
        accent: {
          DEFAULT: "#1D74E8",
          hover: "#1560C2",
        },
      },
      fontFamily: {
        sans: ["Public Sans", "Inter", "sans-serif"],
        heading: ["Plus Jakarta Sans", "Archivo", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
