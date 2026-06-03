import { test, expect } from "@playwright/test"

const BASE_URL = "http://localhost:3004"

test.describe("SEO Audit Verification", () => {
  test("Home page has metadata and JSON-LD schemas", async ({ page }) => {
    await page.goto(BASE_URL)

    // Check canonical URL
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute("href", "https://abdulnabi.in")

    // Check JSON-LD
    const scripts = page.locator('script[type="application/ld+json"]')
    const count = await scripts.count()
    expect(count).toBeGreaterThanOrEqual(2)

    let hasPerson = false
    let hasWebsite = false
    for (let i = 0; i < count; i++) {
      const content = await scripts.nth(i).textContent()
      if (content?.includes('"@type":"Person"')) hasPerson = true
      if (content?.includes('"@type":"WebSite"')) hasWebsite = true
    }
    expect(hasPerson).toBeTruthy()
    expect(hasWebsite).toBeTruthy()
  })

  test("Blog index has metadata and Breadcrumb JSON-LD schema", async ({ page }) => {
    await page.goto(`${BASE_URL}/blog`)

    // Check canonical URL
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute("href", "https://abdulnabi.in/blog")

    // Check JSON-LD
    const scripts = page.locator('script[type="application/ld+json"]')
    const count = await scripts.count()
    expect(count).toBeGreaterThanOrEqual(1)

    let hasBreadcrumb = false
    for (let i = 0; i < count; i++) {
      const content = await scripts.nth(i).textContent()
      if (content?.includes('"@type":"BreadcrumbList"')) hasBreadcrumb = true
    }
    expect(hasBreadcrumb).toBeTruthy()
  })
})
