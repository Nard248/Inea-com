import { test, expect } from '@playwright/test';

// App is served from the domain root, so hrefs have no base-path prefix
const BASE_PATH = '';

test.describe('Services Page', () => {
  test('should display all 8 services on the services page', async ({ page }) => {
    await page.goto('services');

    // Wait for page to load - look for the section title
    await expect(page.locator('h2.section-title').first()).toBeVisible({ timeout: 10000 });

    // Check that services grid is displayed with 8 service cards
    // hrefs include the base path: /Inea-com/services/...
    const serviceLinks = page.locator(`a[href^="${BASE_PATH}/services/"]`);
    await expect(serviceLinks).toHaveCount(8);
  });

  test('should navigate to individual service pages', async ({ page }) => {
    await page.goto('services');

    // Wait for services to load
    await page.waitForSelector(`a[href^="${BASE_PATH}/services/accounting"]`, { timeout: 10000 });

    // Click on the first service
    const firstServiceLink = page.locator(`a[href^="${BASE_PATH}/services/accounting"]`).first();
    await firstServiceLink.click();

    // Verify we're on the service detail page
    await expect(page).toHaveURL(/\/services\/accounting/);

    // Check that service title is displayed
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
  });

  test('should display back button on service detail page', async ({ page }) => {
    await page.goto('services/accounting');

    // Wait for page to load
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

    // Check for back button - specifically the "Back to Services" link
    const backButton = page.getByRole('link', { name: /back to services/i });
    await expect(backButton).toBeVisible();

    // Click back button and verify navigation
    await backButton.click();
    await expect(page).toHaveURL(/\/services$/);
  });

  test('should display related services on service detail page', async ({ page }) => {
    await page.goto('services/accounting');

    // Wait for page to load
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

    // Scroll to related services section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Wait for related services to be visible
    const relatedServicesHeading = page.locator('h2').filter({ hasText: /related/i });
    await expect(relatedServicesHeading).toBeVisible({ timeout: 10000 });

    // Check that related service cards are present (3 related services)
    const relatedSection = page.locator('section.bg-gray-50');
    const relatedServiceCards = relatedSection.locator(`a[href^="${BASE_PATH}/services/"]`);
    await expect(relatedServiceCards).toHaveCount(3);
  });

  test('should navigate between related services', async ({ page }) => {
    await page.goto('services/accounting');

    // Wait for page to load
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

    // Scroll to related services
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Click on a related service
    const relatedSection = page.locator('section.bg-gray-50');
    const relatedServiceLink = relatedSection.locator(`a[href^="${BASE_PATH}/services/"]`).first();
    await expect(relatedServiceLink).toBeVisible({ timeout: 10000 });
    await relatedServiceLink.click();

    // Verify URL changed to a different service
    await expect(page).not.toHaveURL(/\/services\/accounting$/);
    await expect(page).toHaveURL(/\/services\/[\w-]+/);
  });

  test('should redirect to services page for invalid service ID', async ({ page }) => {
    await page.goto('services/invalid-service-id');

    // Should redirect to services page (React Navigate component)
    await expect(page).toHaveURL(/\/services$/, { timeout: 10000 });
  });
});

test.describe('Featured Services Carousel (Homepage)', () => {
  test('should display featured services carousel on homepage', async ({ page }) => {
    await page.goto('');

    // Check for services section with carousel
    const servicesSection = page.locator('section').filter({ hasText: /services/i }).first();
    await expect(servicesSection).toBeVisible({ timeout: 10000 });
  });

  test('should display navigation dots in carousel', async ({ page }) => {
    await page.goto('');

    // Wait for carousel to load
    await page.waitForTimeout(1000);

    // Check for navigation dots (4 featured services)
    const navigationDots = page.locator('button[aria-label^="Go to"]');
    await expect(navigationDots).toHaveCount(4);
  });

  test('should navigate carousel with arrows', async ({ page }) => {
    await page.goto('');

    // Wait for page to fully load
    await page.waitForTimeout(1000);

    // Find the next button (mobile version is always visible)
    const nextButton = page.locator('button[aria-label="Next service"]').last();

    if (await nextButton.isVisible()) {
      // Get initial service title from the h3 in content section
      const titleLocator = page.locator('h3.text-3xl, h3.text-4xl').first();
      await expect(titleLocator).toBeVisible({ timeout: 5000 });
      const initialTitle = await titleLocator.textContent();

      // Click next
      await nextButton.click();

      // Wait for animation
      await page.waitForTimeout(600);

      // Title should have changed
      const newTitle = await titleLocator.textContent();
      expect(newTitle).not.toBe(initialTitle);
    }
  });

  test('should navigate to service detail from carousel', async ({ page }) => {
    await page.goto('');

    // Wait for carousel to load
    await page.waitForTimeout(500);

    // Find and click "Learn More" link in carousel (includes base path)
    const learnMoreLink = page.locator(`a[href^="${BASE_PATH}/services/"]`).first();
    await expect(learnMoreLink).toBeVisible({ timeout: 10000 });
    await learnMoreLink.click();

    // Should navigate to service detail page
    await expect(page).toHaveURL(/\/services\/[\w-]+/);
  });

  test('should have View All Services link', async ({ page }) => {
    await page.goto('');

    // Scroll to find View All link
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForTimeout(500);

    // Find View All link (includes base path)
    const viewAllLink = page.locator(`a[href="${BASE_PATH}/services"]`).filter({ hasText: /view all/i }).first();
    await expect(viewAllLink).toBeVisible({ timeout: 10000 });

    await viewAllLink.click();
    await expect(page).toHaveURL(/\/services$/);
  });
});

test.describe('Services Internationalization', () => {
  test('should display services in English by default', async ({ page }) => {
    await page.goto('services');

    // Wait for page to load
    await page.waitForTimeout(1000);

    // Check for English content - Accounting Services
    await expect(page.locator('text=Accounting Services').first()).toBeVisible({ timeout: 10000 });
  });

  test('should display service detail page content', async ({ page }) => {
    await page.goto('services/accounting');

    // Wait for page to load
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

    // Check that h1 contains Accounting
    await expect(page.locator('h1')).toContainText(/Accounting/i);

    // Check for "What We Offer" section heading (actual text from translation)
    const whatWeOfferHeading = page.locator('h2').filter({ hasText: /what we offer/i });
    await expect(whatWeOfferHeading).toBeVisible();
  });
});

test.describe('Services Accessibility', () => {
  test('should have proper heading structure', async ({ page }) => {
    await page.goto('services/accounting');

    // Wait for page to fully load
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

    // Check for h1
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    // Check for h2s
    const h2s = page.locator('h2');
    const h2Count = await h2s.count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('should have accessible navigation buttons', async ({ page }) => {
    await page.goto('');

    // Wait for page to load
    await page.waitForTimeout(1000);

    // Check carousel navigation buttons have aria-labels
    const prevButtons = page.locator('button[aria-label="Previous service"]');
    const nextButtons = page.locator('button[aria-label="Next service"]');

    // Should have navigation buttons (both desktop hidden and mobile visible)
    const prevCount = await prevButtons.count();
    const nextCount = await nextButtons.count();

    expect(prevCount).toBeGreaterThan(0);
    expect(nextCount).toBeGreaterThan(0);
  });

  test('should have accessible images with alt text', async ({ page }) => {
    await page.goto('services/accounting');

    // Wait for page to load
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

    // Check images have alt attributes
    const images = page.locator('img');
    const imageCount = await images.count();

    expect(imageCount).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });
});

test.describe('Services Navigation Flow', () => {
  test('should complete full navigation flow', async ({ page }) => {
    // Start at homepage
    await page.goto('');

    // Wait for page to load
    await page.waitForTimeout(1000);

    // Navigate to services page via View All link
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForTimeout(500);

    const viewAllLink = page.getByRole('link', { name: /view all/i }).first();
    await expect(viewAllLink).toBeVisible({ timeout: 10000 });
    await viewAllLink.click();
    await expect(page).toHaveURL(/\/services$/);

    // Wait for services page to fully load
    await expect(page.locator('h2.section-title').first()).toBeVisible({ timeout: 10000 });

    // Click on a specific service (Accounting) - more unique name
    const serviceLink = page.locator(`a[href^="${BASE_PATH}/services/accounting"]`).first();
    await expect(serviceLink).toBeVisible({ timeout: 10000 });
    await serviceLink.click();
    await expect(page).toHaveURL(/\/services\/accounting/);

    // Wait for detail page to load
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

    // Navigate to related service
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const relatedSection = page.locator('section.bg-gray-50');
    const relatedLink = relatedSection.locator(`a[href^="${BASE_PATH}/services/"]`).first();
    await expect(relatedLink).toBeVisible({ timeout: 10000 });
    await relatedLink.click();

    // Should be on a different service detail page
    await expect(page).toHaveURL(/\/services\/[\w-]+/);
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

    // Use back button to return to services list
    const backButton = page.getByRole('link', { name: /back to services/i });
    await expect(backButton).toBeVisible();
    await backButton.click();
    await expect(page).toHaveURL(/\/services$/);
  });
});
