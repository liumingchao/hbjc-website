/**
 * tailwind.config.js
 * ---------------------------------------------------------------------------
 * 品牌色 / 字体集中在这里改，改完跑 `npm run build:css` 重新编译即可。
 * （页面用的是编译后的 assets/css/tailwind.css，不依赖外网 CDN）
 * ---------------------------------------------------------------------------
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1.25rem', lg: '2rem' } },
    extend: {
      colors: {
        /* 主色：深蓝 #1a365d */
        brand: {
          50: '#f2f6fb', 100: '#dbe7f5', 200: '#b9cfe9', 300: '#8baed8',
          400: '#5a86c0', 500: '#3a67a3', 600: '#2a5084', 700: '#1a365d',
          800: '#152c4c', 900: '#10203a', 950: '#0a1628',
        },
        /* 点缀色：橙 #ed8936 */
        accent: {
          50: '#fff8f0', 100: '#ffedd8', 200: '#fed7aa', 300: '#fbc078',
          400: '#f6a44b', 500: '#ed8936', 600: '#dd6b20', 700: '#c05621',
          800: '#9c4221', 900: '#7b341e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Barlow Condensed', 'Inter', 'Noto Sans SC', 'Arial Narrow', 'sans-serif'],
      },
      maxWidth: { '8xl': '90rem' },
      boxShadow: {
        card: '0 1px 3px rgba(16,32,58,.06), 0 10px 30px -12px rgba(16,32,58,.18)',
        'card-hover': '0 4px 12px rgba(16,32,58,.10), 0 24px 48px -16px rgba(16,32,58,.28)',
        nav: '0 1px 0 rgba(16,32,58,.08), 0 8px 24px -16px rgba(16,32,58,.35)',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(18px)' }, '100%': { opacity: '1', transform: 'none' } },
        'pulse-ring': { '0%': { transform: 'scale(.85)', opacity: '.7' }, '70%': { transform: 'scale(1.6)', opacity: '0' }, '100%': { opacity: '0' } },
        'marquee': { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        'fade-up': 'fade-up .6s cubic-bezier(.22,.61,.36,1) both',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(.4,0,.6,1) infinite',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};
