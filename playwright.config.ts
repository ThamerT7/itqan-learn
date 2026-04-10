import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for E2E tests against Railway production deployment.
 * Tests verify that all locale translations load correctly.
 */
export default defineConfig({
  testDir: './e2e',

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: 'html',

  // Shared settings for all projects
  use: {
    // Base URL for production Railway deployment
    baseURL: 'https://itqan-learn-production.up.railway.app',

    // Collect trace when retrying a failed test
    trace: 'on-first-retry',

    // Extended timeout for network requests to production
    actionTimeout: 30000,
    navigationTimeout: 30000,
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Timeout for each test
  timeout: 60000,
});
