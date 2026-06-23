import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  timeout: 90000,

  expect: {
    timeout: 30000,
  },

  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 1 : 0,

  workers: process.env.CI ? 1 : 1,

  reporter: [["html"],['list'],["allure-playwright"],['./Support/Utils/customReporter.js']],

  use: {
    baseURL: process.env.BASE_URL,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    ignoreHTTPSErrors: true,
    permissions: ["notifications"],
  },

  projects: [
    {
      name: "setup",
      testMatch: /auth\.setup\.js/,
    },

    {
      name: "login-tests",
      testMatch: /login\.spec\.js/,
      use: {
        storageState: undefined,
      },
    },

    {
      name: "authenticated-tests",
      testIgnore: /login\.spec\.js/,
      use: {
        storageState: "Support/auth/user.json",
      },
      dependencies: ["setup"],
    },
  ],
});

