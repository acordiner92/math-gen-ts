export default {
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(test).+(ts)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'esbuild-jest',
  },
};
