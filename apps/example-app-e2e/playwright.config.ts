import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';

import { workspaceRoot } from '@nx/devkit';
import { CurrentsConfig, currentsReporter } from '@currents/playwright';

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:4300';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const currentsConfig: CurrentsConfig = {
  recordKey: 'AcceNBS8GCEFdr4C', // 📖 https://currents.dev/readme/guides/record-key
  projectId: 'ghc2jY', // get one at https://app.currents.dev
  ciBuildId: '106'
};

export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  reporter: [currentsReporter(currentsConfig)],
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npx nx run example-app:preview',
    url: 'http://localhost:4300',
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: ['example.spec.ts'],
    },
    {
      name: 'firefox',
      use: { ...devices['Firefox'] },
      testMatch: ['example2.spec.ts'],
    },
    {
      name: 'chrome',
      use: { ...devices['Chrome'] },
      testMatch: ['example3.spec.ts'],
    },
  ],
});
