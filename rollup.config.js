import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
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
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      // Do not let Rollup call Object.freeze() on namespace import objects
      // (i.e. import * as namespaceImportObject from...) that are accessed dynamically.
      freeze: false,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
      freeze: false,
    },
  ],
  plugins: [
    // don't bundle any peer dependency
    peerDepsExternal(),

    // resolve only jsx? | tsx? files
    resolve({ extensions }),

    // run the typescript compiler with options from tsconfig.json
    typescript({
      typescript: require('typescript'),
      cacheRoot: `./.rts2_cache_esm`,
    }),

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

    // resolve absolute imports from below
    includePaths({
      paths: ['src'],
      extensions,
    }),
  ],
};
