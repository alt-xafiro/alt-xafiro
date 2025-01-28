import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  testMatch: '**/*.e2e.?(c|m)[jt]s?(x)',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },

    /* Mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 7'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] }
    },

    /* Branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' }
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' }
    }
  ],
  webServer: {
    command: 'pnpm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI
  }
});
