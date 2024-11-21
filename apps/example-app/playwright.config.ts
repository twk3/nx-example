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

// const currentsConfig: CurrentsConfig = {
//   recordKey: 'key', // 📖 https://currents.dev/readme/guides/record-key
//   projectId: 'id', // get one at https://app.currents.dev
//   ciBuildId: '',
// };

export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src/app' }),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  // reporter: [currentsReporter(currentsConfig)],
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npx nx run example-app:preview',
    url: 'http://localhost:4300',
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
