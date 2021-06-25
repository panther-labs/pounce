/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const shouldForwardProp = require('@styled-system/should-forward-prop');

module.exports = {
  require: [path.join(__dirname, 'styleguide.setup.js')],
  template: {
    favicon: 'https://dashboard.runpanther.io/favicon.ico',
    head: {
      links: [
        {
          href:
            'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap',
          rel: 'stylesheet',
        },
      ],
    },
  },
  styleguideComponents: {
    // Component to wrap around every individual example
    Wrapper: path.join(__dirname, 'src/utils/StyleguidistWrapper'),
  },
  title: 'Pounce UI Docs',
  pagePerSection: true,
  usageMode: 'expand',
  propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json', {
    propFilter: prop => {
      const hasDescription = prop.description;
      const isHint = prop.name.includes('aria-') || prop.name === 'inputMode';
      const isSystem = shouldForwardProp.props.includes(prop.name);

      return hasDescription && !isHint && !isSystem;
    },
  }).parse,
  components: 'src/components/**/[A-Z]*.tsx',
  getExampleFilename: componentPath => componentPath.replace('.tsx', '.mdx'),
  ignore: ['src/components/utils/**/*.{ts,tsx}', '**/*.test.*', '**/*__tests__/**/*'],
  styleguideDir: '.styleguidist',
  serverPort: 9000,
  webpackConfig: {
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts'],
      alias: {
        system: path.resolve(__dirname, 'src/system'),
        theme: path.resolve(__dirname, 'src/theme'),
        components: path.resolve(__dirname, 'src/components/'),
        utils: path.resolve(__dirname, 'src/utils/'),
      },
    },
  },
};
