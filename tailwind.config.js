/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        pixelify: "var(--pixelify)"
      },
      colors: {
        // background: 'hsl(var(--background))',
        // foreground: 'hsl(var(--foreground))',
        "dark": "var(--dark)",
        "text": "var(--text)",
        "background": "var(--background)",
        "primary": "var(--primary)",
        "secondary": "var(--secondary)",
        "accent": "var(--accent)",
        "error": "var(--error)",
        "success": "var(--success)",
        "alert": "var(--alert)",
        "aura": "var(--aura)",
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      }
    },
  },
  plugins: [],
}
