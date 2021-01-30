module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  testMatch: ['<rootDir>/lib/__tests__/**/?(*.)test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '\\.(ts)$': 'ts-jest',
  },
};
