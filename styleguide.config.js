/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const babelConfig = require('./babel.config');

const BoxProps = [
  'as',
  'css',
  'm',
  'margin',
  'mt',
  'marginTop',
  'mr',
  'marginRight',
  'mb',
  'marginBottom',
  'ml',
  'marginLeft',
  'mx',
  'marginX',
  'my',
  'marginY',
  'p',
  'padding',
  'pt',
  'paddingTop',
  'pr',
  'paddingRight',
  'pb',
  'paddingBottom',
  'pl',
  'paddingLeft',
  'px',
  'paddingX',
  'py',
  'paddingY',
  'color',
  'bg',
  'fontSize',
  'fontWeight',
  'minWidth',
  'width',
  'height',
  'gridRow',
  'gridColumn',
  'boxShadow',
  'textShadow',
  'border',
  'borderWidth',
  'borderStyle',
  'borderColor',
  'borderRadius',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'position',
  'zIndex',
  'top',
  'right',
  'bottom',
  'left',
  'flex',
];

module.exports = {
  template: {
    favicon: 'https://dashboard.runpanther.io/favicon.ico',
  },
  styleguideComponents: {
    // Component to wrap around every individual example
    Wrapper: path.join(__dirname, 'src/utils/StyleguidistWrapper'),
  },
  title: 'Pounce UI Docs',
  pagePerSection: true,
  usageMode: 'expand',
  propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json', {
    propFilter: (prop, component) => {
      // filter out any component `prop` that doesn't have a description tied to it. We also want
      // to exclude all the `aria` descriptions
      if (!prop.description || prop.name.includes('aria-')) {
        return false;
      }

      // The Box is the main component so we want to show a big list of all prop.
      // On all the other components that extend Box, we don't want to show all inherited prop,
      // but only the additional ones
      return component.name === 'Box' || !BoxProps.includes(prop.name);
    },
  }).parse,
  components: 'src/{components,modules}/**/[A-Z]*.{ts,tsx}',
  ignore: ['src/components/**/Base[A-Z]*.{ts,tsx}'],
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
          options: {
            presets: [...babelConfig.presets, '@babel/preset-react', '@babel/preset-typescript'],
            plugins: babelConfig.plugins,
          },
        },
        {
          test: /\.svg$/,
          loader: 'react-svg-loader',
          options: {
            svgo: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false },
                { removeStyleElement: true },
                { mergePaths: true },
                { removeDimensions: true },
                { removeAttrs: { attrs: 'path:fill' } },
                { addAttributesToSVGElement: { attributes: [{ display: 'block' }] } },
              ],
              multipass: true,
            },

            // whether to output jsx
            jsx: false,
            include: /icons/,
            exclude: /node_modules/,
          },
        },
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src')],
    },
  },
};
