/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'whale-blue': '#0EA5E9',
        'whale-purple': '#8B5CF6',
        'whale-green': '#10B981',
        'whale-yellow': '#F59E0B',
      },
    },
  },
  plugins: [],
}
