module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules:
          process.env.NODE_ENV === 'test'
            ? 'auto'
            : process.env.BABEL_ENV === 'cjs'
            ? 'commonjs'
            : false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  ignore: ['**/*.d.ts'],
  plugins: ['@babel/transform-runtime'],
};
