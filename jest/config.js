const { defaults } = require('jest-config');

module.exports = {
  // Allow searching for modules written in TS
  rootDir: '../',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  testPathIgnorePatterns: ['/dist/', '/.github/', '/node_modules/'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest/setup.ts'],
  verbose: true,
  transform: {
    '^.+\\.tsx?$': ['babel-jest', { configFile: './jest/babel.config.js' }],
  },
  moduleNameMapper: {
    'test-utils': '<rootDir>/jest/utils.tsx',
  },
};
