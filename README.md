Step 1: Initialize Playwright with Javascript
npm init playwright@latest

Step 2: Select options during setup
JavaScript → Yes
Tests folder → tests
GitHub Actions → Yes / No

Step 3: Install project dependencies
npm install

Step 4: Install Playwright browsers
npx playwright install

Step 5: Run all tests
npx playwright test

Step 6: Run tests in headed mode
npx playwright test --headed

Step 7: Run a specific test file
npx playwright test tests/login.spec.ts

Step 8: Run tests on a specific browser
npx playwright test --project=chromium

Step 9: View HTML report
npx playwright show-report

Step 10: Run tests in UI mode
npx playwright test --ui
