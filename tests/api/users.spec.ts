import { test, expect } from '@playwright/test';

test.describe('Reqres Users API', () => {
  test('GET users returns users successfully', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.data).toBeDefined();
    expect(responseBody.data.length).toBeGreaterThan(0);
  });
});

test('GET users returns valid pagination and user structure', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users');

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.page).toBeDefined();
  expect(responseBody.per_page).toBeDefined();
  expect(responseBody.total).toBeDefined();
  expect(responseBody.total_pages).toBeDefined();

  expect(responseBody.page).toBeGreaterThan(0);
  expect(responseBody.per_page).toBeGreaterThan(0);
  expect(responseBody.total).toBeGreaterThan(0);
  expect(responseBody.total_pages).toBeGreaterThan(0);

  expect(responseBody.data).toBeInstanceOf(Array);

  for (const user of responseBody.data) {
    expect(user.id).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.first_name).toBeDefined();
    expect(user.last_name).toBeDefined();
    expect(user.avatar).toBeDefined();
  }
});

test('GET users returns users with valid data', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users');

  expect(response.status()).toBe(200);

  const response_body = await response.json();

  for (const user of response_body.data) {
    expect(typeof user.id).toBe('number');
    expect(user.id).toBeGreaterThan(0);

    expect(typeof user.email).toBe('string');
    expect(user.email).toContain('@');

    expect(typeof user.first_name).toBe('string');
    expect(user.first_name.length).toBeGreaterThan(0);

    expect(typeof user.last_name).toBe('string');
    expect(user.last_name.length).toBeGreaterThan(0);
  }
});