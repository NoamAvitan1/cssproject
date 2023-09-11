/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // background: 'hsl(var(--background))',
        // foreground: 'hsl(var(--foreground))',
        "text": "var(--text)",
        "background": "var(--background)",
        "primary": "var(--primary)",
        "secondary": "var(--secondary)",
        "accent": "var(--accent)",
        "error": "var(--error)",
        "success": "var(--success)",
        "alert": "var(--alert)",
        btn: {
          background: 'hsl(var(--btn-background))',
          'background-hover': 'hsl(var(--btn-background-hover))',
        },
      },
    },
  },
  plugins: [],
}
