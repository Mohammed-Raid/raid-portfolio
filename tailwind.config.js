/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', "Georgia", "serif"],
        sans: ['"Geist"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        // Editorial palette — paper white / ink black / signal red / cobalt
        ink: {
          DEFAULT: "#0a0a0a",
          50: "#fafafa",
          100: "#f4f4f4",
          200: "#e8e8e8",
          300: "#d0d0d0",
          400: "#a0a0a0",
          500: "#707070",
          600: "#404040",
          700: "#2a2a2a",
          800: "#1a1a1a",
          900: "#0a0a0a",
        },
        signal: {
          red: "#ff3b1f",
          cobalt: "#1f3bff",
          cream: "#f5f1e8",
          acid: "#d4ff1f",
        },
      },
      letterSpacing: {
        ultra: "-0.05em",
        mega: "-0.07em",
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "marquee-slow": "marquee 42s linear infinite",
        blink: "blink 1.1s steps(2) infinite",
        pulse2: "pulse2 2.4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "50%": { opacity: "0.2" },
        },
        pulse2: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
    },
  },
  plugins: [],
};
