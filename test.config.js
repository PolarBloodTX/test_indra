module.exports = {
    testEnvironment: 'node',
    testMatch: [
      '**/test/**/*.test.js',
      '**/?(*.)+(spec|test).js'
    ],

    testTimeout: 10000,
    moduleDirectories: ['node_modules'],
    moduleNameMapper: {
      '^@utils/(.*)$': '<rootDir>/utils/$1',
    },
    resetMocks: true,
    verbose: true,
  };
  