# Playwright Automation Framework

## Overview

This repository contains an End-to-End (E2E) Automation Framework built using Playwright with JavaScript. The framework follows the Page Object Model (POM) design pattern and supports environment-based configuration, authentication using Playwright Storage State, HTML reports, Allure reports, and custom reporting.

---

# Tech Stack

- Playwright
- JavaScript
- Node.js
- Page Object Model (POM)
- Dotenv
- Allure Reporting
- HTML Reporting

---

# Framework Features

- Page Object Model (POM)
- Environment-based Configuration
- Storage State Authentication
- Parallel Test Execution
- HTML Report
- Allure Report
- Custom Reporter
- Screenshot on Failure
- Video Recording on Failure
- Trace on Failure
- CI/CD Ready

---

# Project Structure

```
playwright-framework/
│
├── tests/
│   ├── auth.setup.js
│   ├── login.spec.js
│   ├── dashboard.spec.js
│   └── ...
│
├── Support/
│   ├── PageMethod/
│   ├── Locators/
│   ├── Utils/
│   ├── auth/
│   │     └── user.json
│   └── ...
│
├── playwright.config.js
├── package.json
├── .env.example
├── README.md
└── .gitignore
```

---

# Prerequisites

Before running the framework, ensure the following software is installed:

- Node.js (v18 or later recommended)
- npm
- Git

Verify installation

```bash
node -v
npm -v
git --version
```

---

# Clone the Repository

```bash
git clone <repository-url>

cd <repository-name>
```

---

# Install Dependencies

```bash
npm install
```

---

# Install Playwright Browsers

```bash
npx playwright install
```

---

# Environment Configuration

This framework uses environment variables for configuration.

The `.env` file is **not committed** to GitHub for security reasons.

Create a new file named:

```
.env
```

at the project root.

Example:

```env
BASE_URL=https://your-application-url.com

USERNAME=your_username

PASSWORD=your_password
```

> **Important:** Replace the values with valid credentials before executing the tests.

---

# .env.example

A sample `.env.example` file is provided.

Copy it to create your `.env` file.

Windows

```bash
copy .env.example .env
```

Mac/Linux

```bash
cp .env.example .env
```

Then update the values.

Example:

```env
BASE_URL=

USERNAME=

PASSWORD=
```

---

# Authentication Flow

The framework uses Playwright Storage State to avoid logging in before every test.

Execution Flow

```
auth.setup.js
        │
        ▼
Login to Application
        │
        ▼
Generate user.json
        │
        ▼
Authenticated Tests reuse Storage State
```

The setup project automatically creates the authentication state before dependent tests execute.

---

# Running Tests

## Run All Tests

```bash
npx playwright test
```

---

## Run Tests in Headed Mode

```bash
npx playwright test --headed
```

---

## Run Specific Test File

```bash
npx playwright test tests/login.spec.js
```

---

## Run Tests in UI Mode

```bash
npx playwright test --ui
```

---

## Run Tests in Debug Mode

```bash
npx playwright test --debug
```

---

# Reports

## View Playwright HTML Report

```bash
npx playwright show-report
```

---

## Generate Allure Report

```bash
allure serve allure-results
```

---

# Playwright Configuration

The framework is configured with:

- Base URL from environment variables
- Automatic screenshots on failure
- Video recording on failure
- Trace collection on failure
- Parallel execution
- Retry support for CI
- HTML Reporter
- Allure Reporter
- Custom Reporter

---

# Test Execution Order

The framework executes tests in the following order:

```
Setup Project
      │
      ▼
Generate Authentication State
      │
      ▼
Execute Dependent Test Projects
```

---

# Common Issues

## Error

```
Cannot navigate to invalid URL
```

### Reason

The `BASE_URL` environment variable is missing or empty.

### Solution

Verify that your `.env` file exists and contains a valid application URL.

Example:

```env
BASE_URL=https://your-application-url.com
```

---

## Error

```
ENOENT: user.json
```

### Reason

Authentication state has not been generated.

### Solution

Run the setup project first.

```bash
npx playwright test --project=setup
```

or simply execute all tests.

```bash
npx playwright test
```

---

## Error

```
dotenv configuration not loaded
```

### Solution

Verify that:

- `.env` exists
- `dotenv` is installed

Install if required:

```bash
npm install dotenv
```

---

## Error

```
Module not found
```

### Solution

Install all dependencies again.

```bash
npm install
```

---

## Error

```
Playwright browsers not found
```

### Solution

Install Playwright browsers.

```bash
npx playwright install
```

---

# Best Practices

- Do not commit the `.env` file.
- Do not commit production credentials.
- Keep test data separate from test scripts.
- Reuse page objects wherever possible.
- Use meaningful test names.
- Keep locators centralized.
- Execute setup before authenticated tests.
- Review HTML or Allure reports after execution.

---

# Git Ignore

The following files should not be committed:

```
node_modules/

.env

playwright-report/

test-results/

allure-results/

allure-report/

Support/auth/user.json
```

---

# First Time Setup

After cloning the repository, follow these steps:

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to project

```bash
cd <repository-name>
```

### 3. Install dependencies

```bash
npm install
```

### 4. Install Playwright browsers

```bash
npx playwright install
```

### 5. Create `.env`

Copy the sample file.

Mac/Linux

```bash
cp .env.example .env
```

Windows

```bash
copy .env.example .env
```

Update the following values:

```env
BASE_URL=https://your-application-url.com

USERNAME=your_username

PASSWORD=your_password
```

### 6. Execute the framework

```bash
npx playwright test
```

### 7. Open the report

```bash
npx playwright show-report
```

---

# Notes

- The `.env` file is intentionally excluded from version control for security reasons.
- Every user cloning the repository must create their own `.env` file using `.env.example`.
- The framework automatically generates authentication storage state before running dependent test suites.
- Reports, traces, screenshots, and videos are automatically generated for failed test executions.