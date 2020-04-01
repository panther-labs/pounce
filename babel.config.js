/* eslint-disable @typescript-eslint/no-var-requires */
const tsConfig = require('./tsconfig.json');
const transform = require('lodash/transform');

// Convert TS paths to babel-compatible aliases
const aliases = transform(tsConfig.compilerOptions.paths, (r, tsPathValue, tsPathKey) => {
  r[tsPathKey.replace('/*', '')] = tsPathValue.map(p => p.replace('/*', ''));
});

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: process.env.BABEL_ENV === 'cjs' ? 'commonjs' : false,
      },
    ],
    // '@babel/preset-react',
    '@babel/preset-typescript',
    '@emotion/babel-preset-css-prop',
  ],
  ignore: ['**/*.d.ts'],
  plugins: [
    '@babel/transform-runtime',
    [
      'module-resolver',
      {
        root: tsConfig.compilerOptions.baseUrl,
        extensions: ['.js', '.ts', '.tsx'],
        alias: aliases,
      },
    ],
  ],
};
