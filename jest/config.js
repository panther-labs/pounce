const fromPairs = require('lodash/fromPairs');
const { defaults } = require('jest-config');
const tsconfig = require('../tsconfig.json');

const moduleNameMapperFromTSPaths = fromPairs(
  Object.entries(tsconfig.compilerOptions.paths).map(([alias, [aliasedPath]]) => [
    `^${alias.replace(/\*/, '(.*)')}`,
    `<rootDir>/${aliasedPath.replace(/\*/, '$1')}`,
  ])
);

module.exports = {
  rootDir: '../',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  testPathIgnorePatterns: ['/dist/', '/.github/', '/node_modules/'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest/setup.ts'],
  verbose: true,
  moduleNameMapper: moduleNameMapperFromTSPaths,
};
