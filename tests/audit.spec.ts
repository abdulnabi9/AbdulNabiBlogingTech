import { test, expect } from '@playwright/test';
import * as fs from 'fs';

const BASE_URL = 'http://localhost:3004';

const routes = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'Projects', path: '/projects' },
  { name: 'Admin Login', path: '/admin/login' },
  { name: 'Admin Dashboard', path: '/admin' },
  { name: 'Admin Blogs', path: '/admin/blogs' },
  { name: 'Admin New Blog', path: '/admin/blogs/new' },
  { name: 'Admin Settings', path: '/admin/settings' },
];

test.describe('Comprehensive Application Audit', () => {
  const auditResults = {
    working: [] as string[],
    broken: [] as { route: string, status: number }[],
    consoleErrors: [] as { route: string, msg: string }[],
    networkErrors: [] as { route: string, url: string, status: number }[]
  };

  test.afterAll(() => {
    fs.writeFileSync('audit-results.json', JSON.stringify(auditResults, null, 2));
  });

  for (const route of routes) {
    test(`Audit Route: ${route.name}`, async ({ page }) => {
      const consoleMsgs: string[] = [];
      const failedRequests: { url: string, status: number }[] = [];

      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleMsgs.push(msg.text());
          auditResults.consoleErrors.push({ route: route.path, msg: msg.text() });
        }
      });

      page.on('response', response => {
        if (response.status() >= 400 && response.status() !== 404 && !response.url().includes('favicon')) {
          failedRequests.push({ url: response.url(), status: response.status() });
          auditResults.networkErrors.push({ route: route.path, url: response.url(), status: response.status() });
        }
      });

      const response = await page.goto(`${BASE_URL}${route.path}`).catch(() => null);
      
      if (!response) {
        auditResults.broken.push({ route: route.path, status: 0 });
        expect(response).toBeTruthy();
        return;
      }

      await page.screenshot({ path: `screenshots/${route.name.replace(/ /g, '_')}.png`, fullPage: true });

      if (response.status() === 404) {
        auditResults.broken.push({ route: route.path, status: 404 });
        expect(response.status()).not.toBe(404);
      } else if (response.status() >= 400) {
        auditResults.broken.push({ route: route.path, status: response.status() });
        expect(response.status()).toBeLessThan(400);
      } else {
        auditResults.working.push(route.path);
        expect(response.status()).toBeLessThan(400);
      }
    });
  }
});
