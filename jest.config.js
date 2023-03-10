module.exports = {
  verbose: true,
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/libs/testack/tests/*.test.js',
    '<rootDir>/libs/mongodb/tests/*.test.js',
    '<rootDir>/libs/jest_environment_testack/tests/*.test.js'
    // '<rootDir>/libs/create-testack/src/templates/javascript/tests/*.test.js'
  ],

  projects: [
    {
      // preset: 'ts-jest',
      displayName: 'jest-environment',
      testMatch: ['<rootDir>/libs/jest_environment_testack/tests/*.test.js'],
    },
    {    
      displayName: 'mongodb',
      testMatch: ['<rootDir>/libs/mongodb/tests/*.test.js'],
    },
    {    
      displayName: 'testack',
      testMatch: ['<rootDir>/libs/testack/tests/*.test.js'],
    }
  ],
};

