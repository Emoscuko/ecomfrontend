/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    theme: {
      extend: {
        colors: {
          // Trendyol / Baklava palette
          primary:  { DEFAULT: '#F27A1A', dark: '#d96a16', light: '#ff9139' },
          success:  '#0BC15C',
          danger:   '#FF5043',
          warning:  '#FFB600',
          neutral:  { 50:'#fafafa',100:'#f3f4f6',200:'#e5e7eb',300:'#d1d5db',
                      400:'#9ca3af',500:'#6b7280',600:'#4b5563',700:'#374151',
                      800:'#1f2937',900:'#111827' }
        },
        borderRadius: { DEFAULT: '6px' },
        boxShadow: {
          card: '0 4px 12px rgba(0,0,0,.06)',
          hover:'0 6px 16px rgba(0,0,0,.10)'
        },
        transitionProperty: { spacing: 'margin, padding' }
      },
    },
    plugins: [require('@tailwindcss/forms')],
  };
  