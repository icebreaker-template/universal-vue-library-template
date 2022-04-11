/**
 * @type {import('prettier').Config}
 */
const config = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  trailingComma: 'none',
  // endOfLine: 'auto',
  semi: false,
  plugins: [require('prettier-plugin-tailwindcss')]
}

module.exports = config
