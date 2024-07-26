import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    fontFamily: {
      'sans': ['Roboto Mono'],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        'lg': '1024px',
      },
    },
    extend: {
      colors: {
        "light-background": "#fffaf0",
        "dark-purple": "#22162B",
        "russian-violet": "#451F55",
        "ultra-violet": "#724E91",
        "blush": "#E54F6D",
        "saffron": "#F8C630"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "shake": {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(5px, 5px) rotate(0deg)' },
          '50%': { transform: 'translate(0, 0) rotate(0eg)' },
          '75%': { transform: 'translate(-5px, 5px) rotate(0deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg)' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shake-text": "shake 0.1s linear infinite",
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
