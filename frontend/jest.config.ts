import type { Config } from 'jest';

/**
 * Two projects, because the suite has two genuinely different kinds of test.
 *
 * `node` is the original config, unchanged: pure-logic tests (the PWA
 * platform matrix, the chest lifecycle reducer, the onboarding engine) that
 * need no DOM and run fast.
 *
 * `jsdom` is new, for component tests. It is scoped to `__tests__` folders
 * under components/ so it never picks up the node-env suites — adding a DOM
 * to those would slow them down for no benefit.
 */

const shared = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
} satisfies Partial<Config>;

const config: Config = {
  projects: [
    {
      ...shared,
      displayName: 'node',
      testEnvironment: 'node',
      // Every .test.ts anywhere. Deliberately broad: a narrower glob
      // silently dropped components/celebration/__tests__/currency.test.ts
      // when this config was first split into projects.
      testMatch: ['<rootDir>/**/*.test.ts'],
      testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    },
    {
      ...shared,
      displayName: 'jsdom',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/**/__tests__/**/*.test.tsx'],
      testPathIgnorePatterns: ['/node_modules/', '/.next/'],
      setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
      transform: {
        // Components are TSX and use the automatic JSX runtime.
        '^.+\\.(t|j)sx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
      },
    },
  ],
};

export default config;
