import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "secondary-fixed": "#dce2f5",
        "on-surface": "#e2e2e2",
        "on-tertiary": "#2d3136",
        "surface-bright": "#38393a",
        background: "#050505",
        "on-primary-container": "#00491d",
        "tertiary-container": "#a7aab1",
        secondary: "#c0c6d8",
        "outline-variant": "#3d4a3d",
        primary: "#46e176",
        "surface-container-high": "#282a2b",
        "primary-fixed": "#67ff8f",
        surface: "#050505",
        "inverse-primary": "#006d30",
        "on-secondary-fixed": "#151c29",
        "secondary-fixed-dim": "#c0c6d8",
        "on-secondary-container": "#aeb5c7",
        "surface-dim": "#050505",
        "surface-container-highest": "#1c1c1c",
        outline: "#869585",
        "on-secondary": "#2a303e",
        "on-error": "#690005",
        "on-surface-variant": "#bbcbb9",
        "surface-tint": "#46e176",
        "inverse-on-surface": "#2f3131",
        "primary-fixed-dim": "#46e176",
        "on-background": "#e2e2e2",
        "secondary-container": "#404756",
        "surface-container-lowest": "#0d0e0f",
        "error-container": "#93000a",
        "on-tertiary-fixed": "#181c21",
        "primary-container": "#13c35c",
        "surface-container-low": "#0a0a0a",
        error: "#ffb4ab",
        "on-primary-fixed-variant": "#005322",
        "surface-container": "#0f0f0f",
        tertiary: "#c3c6ce",
        "on-tertiary-container": "#3b3f45",
        "on-secondary-fixed-variant": "#404756",
        "surface-variant": "#333535",
        "tertiary-fixed-dim": "#c3c6ce",
        "on-error-container": "#ffdad6",
        "on-primary": "#003915",
        "inverse-surface": "#e2e2e2",
        "on-primary-fixed": "#00210a",
        "tertiary-fixed": "#e0e2ea",
        "on-tertiary-fixed-variant": "#43474d",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        sm: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
      spacing: {
        "section-gap": "120px",
        "margin-mobile": "20px",
        "margin-desktop": "64px",
        unit: "8px",
        gutter: "24px",
        "container-max": "1280px",
      },
      fontFamily: {
        "headline-lg-mobile": ["Outfit", "sans-serif"],
        "label-sm": ["Geist", "monospace"],
        "body-md": ["Manrope", "sans-serif"],
        "headline-md": ["Outfit", "sans-serif"],
        "display-lg": ["Outfit", "sans-serif"],
        "headline-lg": ["Outfit", "sans-serif"],
        "body-lg": ["Manrope", "sans-serif"],
        sans: ["Manrope", "sans-serif"],
      },
      fontSize: {
        "headline-lg-mobile": [
          "32px",
          {
            lineHeight: "1.1",
            letterSpacing: "-0.03em",
            fontWeight: "600",
          },
        ],
        "label-sm": [
          "12px",
          {
            lineHeight: "1.0",
            letterSpacing: "0.05em",
            fontWeight: "500",
          },
        ],
        "body-md": [
          "16px",
          {
            lineHeight: "1.6",
            fontWeight: "400",
          },
        ],
        "headline-md": [
          "32px",
          {
            lineHeight: "1.3",
            fontWeight: "500",
          },
        ],
        "display-lg": [
          "72px",
          {
            lineHeight: "1.05",
            letterSpacing: "-0.04em",
            fontWeight: "600",
          },
        ],
        "headline-lg": [
          "48px",
          {
            lineHeight: "1.1",
            letterSpacing: "-0.03em",
            fontWeight: "600",
          },
        ],
        "body-lg": [
          "18px",
          {
            lineHeight: "1.6",
            fontWeight: "400",
          },
        ],
      },
      maxWidth: {
        "container-max": "1280px",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(70, 225, 118, 0.4)" },
          "50%": { boxShadow: "0 0 20px 8px rgba(70, 225, 118, 0.1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
