const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-light-purple': '#e37ef2',
        'brand-dark-purple': '#312C7D',
        'brand-indigo': '#c336d8',
        'brand-blue': '#4C53D6'
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Space Grotesk', ...defaultTheme.fontFamily.serif]
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
