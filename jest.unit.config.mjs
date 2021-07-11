export default {
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(unit)\\.(test).+(ts)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'esbuild-jest',
  },
  moduleDirectories: ['<rootDir>/src/', '<rootDir>/test/'],
};
