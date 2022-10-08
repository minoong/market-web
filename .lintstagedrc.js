const path = require('path')

const buildEslintCommand = (filenames) =>
 `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`
const buildPrettierCommand = (filenames) => `npx prettier --write ./**/*.{js,ts,tsx,json}`

module.exports = {
 '*.{js,jsx,ts,tsx}': [buildEslintCommand, buildPrettierCommand],
}
