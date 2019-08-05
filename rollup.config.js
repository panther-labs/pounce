import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import includePaths from 'rollup-plugin-includepaths';
import image from 'rollup-plugin-image';
import reactSvg from 'rollup-plugin-react-svg';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json';

// which files types to resolve
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.svg'];

export default {
  // Where the source input is
  input: 'src/index.tsx',

  // create 2 builds; one for commonJS and one for ES6 modules
  output: [
    { file: pkg.module, format: 'es', sourcemap: true },
    {
      file: pkg.browser,
      format: 'umd',
      name: pkg.name,
      sourcemap: true,
      globals: {
        react: 'React',
      },
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

    // Allow SVGs to be loaded as react components
    reactSvg({
      // svgo options
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
      include: /icons\/*.svg$/,
      exclude: /node_modules/,
    }),

    commonjs({
      namedExports: {
        'node_modules/react/index.js': ['Component', 'PureComponent', 'Fragment', 'Children'],
        'node_modules/prop-types/index.js': [
          'object',
          'func',
          'oneOfType',
          'node',
          'bool',
          'string',
          'number',
          'any',
        ],
        'node_modules/react-is/index.js': [
          'isElement',
          'isValidElementType',
          'isForwardRef',
          'ForwardRef',
        ],
      },
    }),

    image(),

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

    // resolve absolute imports from below
    includePaths({
      paths: ['src'],
      extensions,
    }),
  ],
};
