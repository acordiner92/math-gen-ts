export default {
  roots: ['<rootDir>/src'],
  extensionsToTreatAsEsm: ['.ts'],
  testMatch: ['**/?(*.)+(e2e)\\.(test).+(ts)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'esbuild-jest',
  },
  globalSetup: '<rootDir>/test/e2e/global.setup.ts',
  globalTeardown: '<rootDir>/test/e2e/global.teardown.ts',
  moduleDirectories: ['<rootDir>/db/migrations'],
  modulePaths: ['<rootDir>'],
};
