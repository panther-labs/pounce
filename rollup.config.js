import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json';

// which files types to resolve
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  // Where the source input is
  input: 'src/index.tsx',

  // create 2 builds; one for commonJS and one for ES6 modules
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es', sourcemap: true },
    {
      file: pkg.browser,
      format: 'umd',
      name: pkg.name,
      sourcemap: true,
    },
  ],
  plugins: [
    // don't bundle any peer dependency
    peerDepsExternal(),

    // resolve only jsx? | tsx? files
    resolve({ extensions }),

    // using `.babelrc` configuration, run the files through babel while including a runtime helper
    // and excluding anything located under node_modules (the latter won't be ran through babel)
    babel({
      extensions,
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),

    // When creating a commonJS build, allow the following items to be exported independently
    commonjs({
      namedExports: {
        'node_modules/react/index.js': [
          'Component',
          'PureComponent',
          'Fragment',
          'Children',
          'createElement',
        ],
      },
    }),

    // minify and optimise the code
    terser({
      parse: {
        // we want terser to parse ecma 8 code. However, we don't want it
        // to apply any minfication steps that turns valid ecma 5 code
        // into invalid ecma 5 code.
        ecma: 8,
      },
      compress: {
        ecma: 5,
        warnings: false,
        comparisons: false,
        inline: 2,
      },
      output: {
        ecma: 5,
        comments: false,
      },
    }),
  ],
};
