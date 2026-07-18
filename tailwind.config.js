/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        primary: "#FFFFFF",
        surface: "#0A0A0A",
        surfaceHover: "#141414",
        dark: "#050505",
        light: "#ffffff",
        'mate-bg': '#050505',
        'mate-bg2': '#0E0E0E',
        'mate-card': 'rgba(255,255,255,0.04)',
        'mate-border': 'rgba(255,255,255,0.08)',
        'mate-text': '#FFFFFF',
        'mate-text2': '#BDBDBD',
        'mate-accent': '#E5E7EB',
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        serif: ['"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      fontSize: {
        'display': ['clamp(3rem, 7vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'editorial': ['clamp(2.25rem, 5vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading': ['clamp(1.5rem, 3vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'subheading': ['clamp(1.125rem, 1.5vw, 1.5rem)', { lineHeight: '1.4' }],
        'body-lg': ['clamp(1rem, 1.2vw, 1.25rem)', { lineHeight: '1.7' }],
        'body': ['clamp(0.875rem, 1vw, 1rem)', { lineHeight: '1.7' }],
        'caption': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.08em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'blur-in': 'blurIn 0.8s ease-out forwards',
        'draw-line': 'drawLine 1.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(10px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        drawLine: {
          '0%': { height: '0%' },
          '100%': { height: '100%' },
        },
      },
      backdropBlur: {
        'nav': '20px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
