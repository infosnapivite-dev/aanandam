/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aps-green': {
          DEFAULT: '#173D2C',
          dark: '#112F22',
          light: '#274C3B',
          soft: '#EAF1EC',
          muted: '#3D5E4E'
        },
        'aps-ivory': {
          DEFAULT: '#F6EDE3',
          light: '#FBF6F0',
          alt: '#EFE4DA',
          card: '#F6EDE3',
          dark: '#E8DCD0',
          skeleton: '#EADBCC'
        },
        'aps-gold': {
          DEFAULT: '#B48A4A',
          hover: '#9E773E',
          light: '#DFD3C1',
          soft: '#F6EFE6'
        },
        'aps-text': {
          primary: '#24221E',
          secondary: '#777268',
          muted: '#9C968B'
        },
        'aps-border': {
          DEFAULT: '#DED6C8',
          subtle: '#E9E2D6'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'aps-subtle': '0 4px 20px -2px rgba(23, 61, 44, 0.05)',
        'aps-card': '0 8px 30px -4px rgba(36, 34, 30, 0.06)',
        'aps-elevated': '0 20px 40px -10px rgba(23, 61, 44, 0.1)',
        'aps-gold': '0 4px 15px -2px rgba(180, 138, 74, 0.25)',
      }
    },
  },
  plugins: [],
}
