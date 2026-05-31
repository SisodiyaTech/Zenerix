/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#00A3FF',
        'neon-blue': '#0066FF',
        'deep-navy': '#1A1F2B',
        'charcoal-black': '#0D0F14',
        'silver': '#C7CCD6',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #0066FF, #00A3FF)',
        'surface-gradient': 'linear-gradient(145deg, rgba(26, 31, 43, 0.7), rgba(13, 15, 20, 0.9))',
      },
      boxShadow: {
        'neon-glow': '0 0 20px rgba(0, 163, 255, 0.4), 0 0 40px rgba(0, 102, 255, 0.2)',
      },
      animation: {
        'float-slow': 'float 10s ease-in-out infinite alternate',
        'float-slow-reverse': 'float 12s ease-in-out infinite alternate-reverse',
        'morph-slow-1': 'morph 8s ease-in-out infinite',
        'morph-slow-2': 'morph 10s ease-in-out infinite reverse',
        'spin-slow': 'spin 20s linear infinite',
        'spin-slow-reverse': 'spin 15s linear infinite reverse',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(50px, 50px)' },
        },
        morph: {
          '0%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
          '25%': { borderRadius: '58% 42% 75% 25% / 76% 46% 54% 24%' },
          '50%': { borderRadius: '50% 50% 33% 67% / 55% 27% 73% 45%' },
          '75%': { borderRadius: '33% 67% 58% 42% / 63% 68% 32% 37%' },
          '100%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
        }
      }
    },
  },
  plugins: [],
}
