import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    // Dedicated port: 5173 is often occupied by an unrelated dev server, and
    // reuseExistingServer would silently run the suite against the wrong app.
    baseURL: 'http://localhost:5199/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Note: On Mac with Apple Silicon, you may need to start the dev server manually
  // with `npm run dev` in a separate terminal before running tests.
  // Alternatively, use `npm run test:with-server` which handles this.
  webServer: {
    command: 'npm run dev -- --port 5199 --strictPort',
    url: 'http://localhost:5199/',
    reuseExistingServer: true,
    timeout: 30000,
  },
});
