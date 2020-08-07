module.exports = api => {
  api.cache(false);
  return {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-react',
      '@babel/preset-typescript',
      '@emotion/babel-preset-css-prop',
    ],
    ignore: ['**/*.d.ts'],
    plugins: ['@babel/transform-runtime'],
  };
};
