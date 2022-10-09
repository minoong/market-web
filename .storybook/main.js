const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
 stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
 addons: [
  '@storybook/addon-links',
  '@storybook/addon-essentials',
  '@storybook/addon-interactions',
  {
   /**
    * Fix Storybook issue with PostCSS@8
    * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
    */
   //postcss를 활용할 수 있도록 이 부분 추가.
   name: '@storybook/addon-postcss',
   options: {
    postcssLoaderOptions: {
     implementation: require('postcss'),
    },
   },
  },
  '@storybook/preset-scss',
 ],
 framework: '@storybook/react',
 core: {
  builder: '@storybook/builder-webpack5',
 },
 typescript: { reactDocgen: false },
 webpackFinal(config) {
  const rules = config.module.rules
  const fileLoaderRule = rules.find((rule) => rule.test && rule.test.test('.svg'))

  fileLoaderRule.exclude = /\.svg$/
  rules.push({ test: /\.svg$/, use: ['@svgr/webpack'] })

  config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, '../src')]
  config.resolve.plugins = [...(config.resolve.plugins || []), new TsconfigPathsPlugin({})]

  return config
 },
}
