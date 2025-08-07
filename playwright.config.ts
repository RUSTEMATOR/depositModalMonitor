import { defineConfig, devices } from '@playwright/test';
import generateCustomLayoutAsync from './my_custom_layout';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter t,o use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'],
[
       "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
      {
        slackOAuthToken: process.env.SLACK_BOT_USER_OAUTH_TOKEN,
        channels: ['test-reporter', 'kb-payment'],
        sendResults: 'always',
        layoutAsync: generateCustomLayoutAsync,
        showInThread: true,
        sendCustomBlocksInThreadAfterIndex: 3, // Only first 3 blocks in main message, rest in thread
      },
    ],
  ],

  timeout: 120000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    headless: true,
    
    /* Screenshot comparison settings */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  /* Global screenshot comparison settings */
  expect: {
    // Configure screenshot comparison
    toHaveScreenshot: {
      threshold: 0.3, // 30% threshold for pixel differences
      maxDiffPixelRatio: 0.1, // Allow up to 10% of pixels to be different
      animations: 'disabled', // Disable animations for consistent screenshots
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    //
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
