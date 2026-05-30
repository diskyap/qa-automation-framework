[![QA Automation Pipeline](https://github.com/diskyap/qa-automation-framework/actions/workflows/playwright.yml/badge.svg?branch=master)](https://github.com/diskyap/qa-automation-framework/actions/workflows/playwright.yml)

# SauceDemo E2E Test Automation Framework

A comprehensive end-to-end testing suite for the SauceDemo web application and API testing using Playwright with TypeScript. 
This framework implements the Page Object Model pattern and includes detailed reporting via Allure.

## 🔍 Features

- **TypeScript Implementation**: Strong typing and better maintainability
- **Page Object Model**: Modular and reusable page components
- **Data-Driven Testing**: Test data from JSON files
- **Parallel Execution**: Optimized test execution with worker threads
- **Environment Variables**: Support for multiple environments (.env.qa, .env.prod, etc.)
- **Comprehensive Reporting**: Detailed Allure reports with screenshots, logger and videos
- **Cross-browser Testing**: Support for Chromium, Firefox, and WebKit
- **CI/CD Ready**: Configured for continuous integration
- **Test Categories**: Organized test suites (Smoke, Regression, E2E, etc.)
- **API Testing**: Dedicated API test suites
- **Logging**: Comprehensive logging with timestamps and test context
- **Error Handling**: Robust error handling and retry mechanisms


## 🏗️ Project Structure

```
qa-automation-framework/
├── tests/            # Test suites
├── pages/            # Page Object Models
├── api/              # API test suites
├── utils/            # Helper functions
├── fixtures/         # Test fixtures
├── data/             # Test data
├── allure-report/    # Test reports
├── logs/             # Test logs
├── .env.qa           # Environment variables for QA
├── .env.prod         # Environment variables for Production
└── config files      # TypeScript and Playwright configs
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm (Node Package Manager) or yarn (recommended)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd qa-automation-framework
```

2. Install dependencies:
```bash
npm install or yarn install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🎯 Running Tests

### Test Execution Commands

```bash
# Run all tests
npm run test

# Run with UI mode
npm run test:headed

# Run specific test categories
npm run test:smoke        # Smoke tests
npm run test:regression   # Regression tests
npm run test:e2e          # End-to-end tests
npm run test:negative     # Negative test cases

# Run specific features
npm run test:login        # Login tests
npm run test:checkout     # Checkout tests
npm run test:inventory    # Inventory tests

# Run with Allure reporting
npm run test:allure       # Run tests with Allure reporter
npm run allure:report     # Generate and open Allure report
```

## 📊 Test Coverage

### Key Test Scenarios

1. **Login/Authentication**
   - Valid login flows
   - Session management
   - Logout verification

2. **Inventory Management**
   - Product sorting
   - Product details
   - Inventory interactions

3. **Shopping Cart**
   - Add/remove items
   - Cart updates
   - Quantity management

4. **Checkout Process**
   - Complete purchase flow
   - Order confirmation
   - Price calculations

5. **Negative Test Cases**
   - Invalid login attempts
   - Form validations
   - Error handling

## 📝 Test Plan Overview

### Scope
- Login functionality
- Product inventory management
- Shopping cart operations
- Checkout process
- User session handling
- Field validations
- Sorting and filtering capabilities

### Test Types
- Smoke Tests: Critical path verification
- Regression Tests: Comprehensive coverage
- E2E Tests: Complete user journeys
- Negative Tests: Error handling and validation

## 📈 Reporting

The framework uses Allure Reporter for detailed test reporting:

- Test execution results
- Screenshots on failure
- Video recordings
- Step-by-step execution logs
- Test duration and trends
- Environment information

To generate and view the report:
```bash
npm run reporter:open
```

## 🛠️ Framework Components

### Page Objects
- `login.page`: Authentication flows
- `inventory.page`: Product listing and management
- `cart.page`: Shopping cart operations
- `checkout.page`: Purchase process
- `base.page`: Common functionality

### Utilities
- `faker`: Data generation
- `logger`: Logging utilities
- `readerJson`: JSON file reading(helper)
- `schemaValidator`: JSON schema validation

## 📄 License

This project is licensed under the MIT License.
