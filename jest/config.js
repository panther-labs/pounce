const { defaults } = require('jest-config');

module.exports = {
  rootDir: '../',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  testPathIgnorePatterns: ['/dist/', '/.github/', '/node_modules/'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest/setup.ts'],
  verbose: true,
  moduleNameMapper: {
    'test-utils': '<rootDir>/jest/utils',
  },
};
