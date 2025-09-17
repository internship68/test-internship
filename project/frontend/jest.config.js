export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/frontend/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/frontend/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: [
    '<rootDir>/frontend/**/__tests__/**/*.(ts|tsx|js)',
    '<rootDir>/frontend/**/?(*.)(spec|test).(ts|tsx|js)',
  ],
  collectCoverageFrom: [
    'frontend/**/*.{ts,tsx}',
    '!frontend/**/*.d.ts',
    '!frontend/main.tsx',
    '!frontend/vite-env.d.ts',
  ],
};