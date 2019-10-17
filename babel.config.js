module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
      },
    ],
    '@babel/preset-react',
    '@emotion/babel-preset-css-prop',
  ],
  plugins: ['@babel/transform-runtime'],
};
