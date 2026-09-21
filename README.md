# AMFK Playwright Homework

End-to-end and API tests for SauceDemo, written with Playwright and TypeScript.

## Requirements

- Node.js 18 or newer
- npm

## Installation

Install the project dependencies:

```bash
npm install
```

Install the Playwright browsers if they are not already available:

```bash
npx playwright install
```

## Running Tests

Run the complete test suite:

```bash
npx playwright test
```

Run a specific test area:

```bash
npx playwright test tests/e2e
npx playwright test tests/api
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

The configured suite runs against Chromium, Firefox, and WebKit.

## Test Reports

After a test run, open the HTML report with:

```bash
npx playwright show-report
```

## Project Structure

- `pages/` - Page Object Model classes for login, products, cart, and checkout pages
- `test-data/` - JSON test data for login and checkout scenarios
- `tests/e2e/` - SauceDemo end-to-end tests
- `tests/api/` - Reqres API tests
- `playwright.config.ts` - Playwright test configuration


## Test Selection

- Elsősorban a vásárlási folyamat kritikus lépéseit választottam ki: bejelentkezés, termék kosárba helyezése, kosár ellenőrzése és a vásárlás sikeres lezárása.
- A happy pathe-ek mellet lefedtem néhány negatív esetet is, mint például bejelentkezés hibás adatokkal vagy checkout mező hiánya.
- A cél az volt, hogy csak a legfontosabb folyamatokra és azok validációit ellenőrizzem, mindezt anélkül, hogy minden lehetséges sceneriora külön-külön tesztet írnék.