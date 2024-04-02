/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'white': '#FFF',
      'black': '#171A1FFF',
      'gray': "#565D6DFF",
      'dark_orange': '#FF402BFF',
      'hover_orange': '#EC1800FF',
      'faded_orange': '#FFF1F0FF',
      'silver': '#9095A1FF',
      'light': '#f2f2fa',
    },
    fontSize: {
      'small': '14px',
      'normal': '16px',
      'medium': '28px',
      'large': '32px',
      'xlarge': '36px',
      'xxlarge': '45px',
    }
  },
  plugins: [],
}