/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-hi': 'var(--surface-hi)',
        cyan: 'var(--cyan)',
        'cyan-dim': 'var(--cyan-dim)',
        coral: 'var(--coral)',
        'coral-dim': 'var(--coral-dim)',
        amber: 'var(--amber)',
        'amber-dim': 'var(--amber-dim)',
        purple: 'var(--purple)',
        'purple-dim': 'var(--purple-dim)',
        green: 'var(--green)',
        'green-dim': 'var(--green-dim)',
        muted: 'var(--muted)',
        text: 'var(--text)',
        'text-sub': 'var(--text-sub)',
        red: 'var(--red)',
        'red-dim': 'var(--red-dim)',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        pill: '100px',
        row: '12px',
      },
    },
  },
  plugins: [],
}
