import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './assets/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          // Core backgrounds
          void:    '#020816',
          deep:    '#050d1f',
          mid:     '#0a1628',
          surface: '#0f1e38',

          // Neon accents
          cyan:    '#00f5ff',
          blue:    '#0ea5e9',
          purple:  '#7c3aed',
          violet:  '#a855f7',
          teal:    '#14b8a6',
          green:   '#00ff88',
          amber:   '#ffaa00',
          red:     '#ff3b5c',

          // Text
          primary:   '#e2f8ff',
          secondary: 'rgba(226,248,255,0.65)',
          muted:     'rgba(226,248,255,0.35)',

          // Borders
          border:    'rgba(0,245,255,0.2)',
          'border-bright': 'rgba(0,245,255,0.5)',
        },
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        display: ['"Orbitron"', 'monospace'],
        body: ['"Exo 2"', 'sans-serif'],
      },
      boxShadow: {
        'cosmic-sm': '0 0 8px rgba(0,245,255,0.25)',
        'cosmic':    '0 0 20px rgba(0,245,255,0.3)',
        'cosmic-lg': '0 0 40px rgba(0,245,255,0.35)',
        'cosmic-purple': '0 0 20px rgba(124,58,237,0.4)',
        'cosmic-green':  '0 0 20px rgba(0,255,136,0.35)',
        'cosmic-amber':  '0 0 20px rgba(255,170,0,0.35)',
        'cosmic-red':    '0 0 20px rgba(255,59,92,0.35)',
        'inner-glow': 'inset 0 0 30px rgba(0,245,255,0.05)',
      },
      backgroundImage: {
        'cosmic-radial': 'radial-gradient(ellipse at center, #0a1628 0%, #020816 70%)',
        'cosmic-grid': `
          linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)
        `,
        'shimmer': 'linear-gradient(90deg, transparent, rgba(0,245,255,0.15), transparent)',
        'btn-primary': 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(14,165,233,0.1))',
        'btn-danger':  'linear-gradient(135deg, rgba(255,59,92,0.15), rgba(255,59,92,0.05))',
        'card-surface': 'linear-gradient(145deg, rgba(15,30,56,0.9), rgba(10,22,40,0.95))',
      },
      animation: {
        'pulse-slow':   'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'shimmer':      'shimmer 2s linear infinite',
        'float':        'float 6s ease-in-out infinite',
        'scan':         'scan 4s linear infinite',
        'flicker':      'flicker 0.15s infinite',
        'border-spin':  'border-spin 6s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-8px)' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.85' },
        },
        'border-spin': {
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config