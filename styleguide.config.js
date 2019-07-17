module.exports = {
  template: {
    favicon: 'https://dashboard.runpanther.io/favicon.ico',
  },
  title: 'Pounce UI Docs',
  usageMode: 'expand',
  propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json').parse,
  skipComponentsWithoutExample: true,
  components: 'src/components/**/[A-Z]*.{ts,tsx}',
  styleguideDir: '.styleguidist',
  serverPort: 9000,
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
  },
};
