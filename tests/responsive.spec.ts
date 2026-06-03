import { test, expect } from '@playwright/test';

const pages = [
  { name: 'Home', url: '/' },
  { name: 'Blog List', url: '/blog' },
  { name: 'Projects', url: '/projects' },
  { name: 'Admin Login', url: '/admin/login' },
];

const viewports = [
  { name: 'Mobile_320', width: 320, height: 568 },
  { name: 'Mobile_375', width: 375, height: 667 },
  { name: 'Mobile_390', width: 390, height: 844 },
  { name: 'Mobile_414', width: 414, height: 896 },
  { name: 'Tablet_768', width: 768, height: 1024 },
  { name: 'Laptop_1024', width: 1024, height: 768 },
  { name: 'Desktop_1440', width: 1440, height: 900 },
  { name: 'Desktop_1920', width: 1920, height: 1080 },
];

for (const { name: pageName, url } of pages) {
  test.describe(`Page: ${pageName}`, () => {
    for (const vp of viewports) {
      test(`Responsive: ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        
        const errors: string[] = [];
        page.on('pageerror', err => errors.push(`Runtime error: ${err.message}`));
        page.on('console', msg => {
          if (msg.type() === 'error') {
            errors.push(`Console error: ${msg.text()}`);
          }
        });

        await page.goto(`http://localhost:3004${url}`);
        
        // Wait for page load
        await page.waitForLoadState('domcontentloaded');
        
        // Take screenshot
        await page.screenshot({ path: `tests/screenshots/${pageName.replace(' ', '_')}_${vp.name}.png`, fullPage: true });

        // Check for horizontal overflow
        const overflow = await page.evaluate(() => {
          const docWidth = document.documentElement.scrollWidth;
          const winWidth = window.innerWidth;
          return docWidth > winWidth;
        });
        
        expect(overflow, 'Page should not have horizontal scrolling overflow').toBe(false);
        expect(errors.length, `There should be no console/runtime errors, found: ${errors.join(', ')}`).toBe(0);
      });
    }
  });
}
