/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-blue-50',
    'bg-blue-100',
    'bg-blue-500',
    'bg-blue-600',
    'text-blue-600',
    'text-blue-700',
    'bg-green-50',
    'bg-green-100', 
    'bg-green-500',
    'text-green-600',
    'text-green-700',
    'bg-orange-50',
    'bg-orange-100',
    'bg-orange-500',
    'text-orange-600',
    'text-orange-700',
    'bg-purple-50',
    'bg-purple-100',
    'bg-purple-500',
    'text-purple-600',
    'text-purple-700',
    'bg-yellow-50',
    'text-yellow-700',
    'bg-red-50',
    'bg-indigo-50',
    'bg-indigo-100',
    'text-indigo-700',
  ],
};