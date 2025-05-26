export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(import.meta.env.PROD ? { cssnano: {} } : {})
  },
}