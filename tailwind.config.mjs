/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './index.html',
    './about.html',
    './projects.html',
    './contact.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      opacity: {
        '98': '0.98'
      },
      colors: {
        // Charcoal gradient base
        charcoal: {
          950: '#0a0a0b',
          900: '#121214',
          800: '#1a1a1e',
          700: '#25252a',
          600: '#323238',
        },
        // Electric teal accent
        teal: {
          400: '#00d4aa',
          500: '#00c29c',
          600: '#00b08c',
        },
        // Warm coral accent
        coral: {
          400: '#ff6b5b',
          500: '#f85a4a',
          600: '#e74d3d',
        },
        // Muted indigo accent
        indigo: {
          400: '#6366f1',
          500: '#5a5ce6',
          600: '#4f4fd6',
        },
        // Legacy brand colors for compatibility
        brand: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e8eaed',
          300: '#dadce0',
          400: '#bdc1c6',
          500: '#9aa0a6',
          600: '#80868b',
          700: '#5f6368',
          800: '#3c4043',
          900: '#202124'
        },
        accent: {
          50: '#fef7ff',
          100: '#fdecff',
          200: '#fad9ff',
          300: '#f5baff',
          400: '#ed8fff',
          500: '#e155ff',
          600: '#d333f7',
          700: '#b91de3',
          800: '#9a1bb8',
          900: '#7d1a95'
        },
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d'
        },
        yellow: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        },
        // Pure blacks and whites for better contrast
        'true-black': '#000000',
        'true-white': '#ffffff',
        'off-black': '#0a0a0a',
        'off-white': '#fafafa'
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0,0,0,0.04), 0 1px 3px 1px rgba(0,0,0,0.06)',
        'depth': '0 4px 12px -2px rgba(0,0,0,0.08), 0 2px 6px -1px rgba(0,0,0,0.04)'
      },
      backgroundImage: {
        'gradient-flat': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 40%, #eef2ff 100%)',
        'gradient-accent': 'linear-gradient(135deg, #2a8def 0%, #55aaf6 60%, #89c7fa 100%)',
        // New gradient definitions
        'hero-gradient': 'radial-gradient(ellipse at top, #1a1a1e 0%, #0a0a0b 50%)',
        'card-gradient': 'linear-gradient(145deg, rgba(37, 37, 42, 0.6) 0%, rgba(26, 26, 30, 0.4) 100%)',
        'glow-teal': 'radial-gradient(circle at center, rgba(0, 212, 170, 0.15) 0%, transparent 70%)',
        'glow-coral': 'radial-gradient(circle at center, rgba(255, 107, 91, 0.15) 0%, transparent 70%)',
        'noise-pattern': `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      },
    }
  },
  plugins: []
};
