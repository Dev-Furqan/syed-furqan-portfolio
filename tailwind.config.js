/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Satoshi', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        ink: '#05070d',
        panel: '#0b111b',
        line: 'rgba(255,255,255,0.12)',
        mist: '#aab5c5',
        frost: '#e9eef7',
        cyan: '#5df2ff',
        violet: '#a78bfa',
        coral: '#ff7a6b',
        mint: '#85f6c8',
      },
      boxShadow: {
        glow: '0 0 48px rgba(93, 242, 255, 0.2)',
        panel: '0 24px 80px rgba(0,0,0,0.34)',
      },
      backgroundImage: {
        grid:
          'linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)',
      },
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [],
};
