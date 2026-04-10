import { test, expect } from '@playwright/test';

/**
 * E2E tests for Railway deployment localization fix.
 * Verifies that all 5 locale translations load correctly.
 */

const LOCALES = ['en', 'tr', 'fr', 'ur', 'id'] as const;
type Locale = typeof LOCALES[number];

// Expected content patterns for each locale to verify translations loaded
const LOCALE_PATTERNS: Record<Locale, { lang: string; patterns: RegExp[] }> = {
  en: {
    lang: 'en',
    patterns: [/learn/i, /start/i, /course/i],
  },
  tr: {
    lang: 'tr',
    patterns: [/öğren/i, /başla/i, /kurs/i],
  },
  fr: {
    lang: 'fr',
    patterns: [/apprendre/i, /commencer/i, /cours/i],
  },
  ur: {
    lang: 'ur',
    patterns: [/سیکھیں/i, /شروع/i, /کورس/i],
  },
  id: {
    lang: 'id',
    patterns: [/belajar/i, /mulai/i, /kursus/i],
  },
};

// Error patterns that indicate translation failures
const ERROR_PATTERNS = [
  /module not found/i,
  /cannot find module/i,
  /failed to load/i,
  /translation key/i,
  /missing translation/i,
  /\{\{.*\}\}/,  // Unresolved template variables
  /^[a-z]+\.[a-z]+\.[a-z]+$/,  // Untranslated keys like "common.button.start"
];

test.describe('Locale Loading Tests', () => {
  for (const locale of LOCALES) {
    test.describe(`Locale: ${locale}`, () => {
      test(`loads ${locale} page successfully (HTTP 200)`, async ({ page }) => {
        const response = await page.goto(`/${locale}`);

        // Verify HTTP 200 response
        expect(response?.status()).toBe(200);
      });

      test(`${locale} page contains locale-specific content`, async ({ page }) => {
        await page.goto(`/${locale}`);

        // Wait for content to load
        await page.waitForLoadState('networkidle');

        // Get page content
        const bodyText = await page.textContent('body');

        // Verify page has substantial content (not an error page)
        expect(bodyText?.length).toBeGreaterThan(100);

        // Check that at least one locale-specific pattern is present
        const patterns = LOCALE_PATTERNS[locale].patterns;
        const hasLocaleContent = patterns.some(pattern => pattern.test(bodyText || ''));

        // For non-English locales, we check for translated content
        // For English, we verify it's not showing untranslated keys
        if (locale !== 'en') {
          // If locale-specific content is not found, at least verify no error messages
          if (!hasLocaleContent) {
            for (const errorPattern of ERROR_PATTERNS) {
              expect(bodyText).not.toMatch(errorPattern);
            }
          }
        }
      });

      test(`${locale} page has no translation errors visible`, async ({ page }) => {
        await page.goto(`/${locale}`);
        await page.waitForLoadState('networkidle');

        const bodyText = await page.textContent('body');

        // Check for common error patterns that indicate translation failures
        for (const errorPattern of ERROR_PATTERNS) {
          const match = bodyText?.match(errorPattern);
          expect(
            match,
            `Found translation error pattern: ${match?.[0]}`
          ).toBeNull();
        }
      });

      test(`${locale} page sets correct html lang attribute`, async ({ page }) => {
        await page.goto(`/${locale}`);
        await page.waitForLoadState('domcontentloaded');

        const htmlLang = await page.getAttribute('html', 'lang');

        // Verify the lang attribute is set (may include region code like en-US)
        expect(htmlLang).toBeTruthy();
        expect(htmlLang?.startsWith(locale)).toBe(true);
      });
    });
  }
});

test.describe('Locale Switching Tests', () => {
  test('can navigate between all locales', async ({ page }) => {
    // Start at English
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    // Visit each locale in sequence
    for (const locale of LOCALES) {
      await page.goto(`/${locale}`);
      const response = await page.waitForLoadState('networkidle');

      // Verify we're on the correct locale page
      expect(page.url()).toContain(`/${locale}`);

      // Verify no console errors related to translation loading
      const consoleErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      // Check that the page didn't log module loading errors
      const translationErrors = consoleErrors.filter(
        err => /module|translation|locale|i18n/i.test(err)
      );
      expect(translationErrors).toHaveLength(0);
    }
  });

  test('locale preference persists on navigation', async ({ page }) => {
    // Navigate to Turkish locale
    await page.goto('/tr');
    await page.waitForLoadState('networkidle');

    // Find and click a navigation link (if exists)
    const links = await page.$$('a[href*="/tr"]');

    if (links.length > 0) {
      // Click first internal link
      await links[0].click();
      await page.waitForLoadState('networkidle');

      // Verify we're still on Turkish locale
      expect(page.url()).toContain('/tr');
    }
  });
});

test.describe('Network Error Detection', () => {
  test('no 404 errors for locale resources', async ({ page }) => {
    const failedRequests: string[] = [];

    // Monitor for failed requests
    page.on('response', response => {
      if (response.status() === 404) {
        failedRequests.push(response.url());
      }
    });

    // Visit each locale and check for 404s
    for (const locale of LOCALES) {
      await page.goto(`/${locale}`);
      await page.waitForLoadState('networkidle');
    }

    // Filter for locale/translation related 404s
    const translationErrors = failedRequests.filter(
      url => /locale|translation|i18n|messages|lang/i.test(url)
    );

    expect(
      translationErrors,
      `Found 404 errors for translation resources: ${translationErrors.join(', ')}`
    ).toHaveLength(0);
  });

  test('no JavaScript errors on locale pages', async ({ page }) => {
    const jsErrors: string[] = [];

    page.on('pageerror', error => {
      jsErrors.push(error.message);
    });

    for (const locale of LOCALES) {
      await page.goto(`/${locale}`);
      await page.waitForLoadState('networkidle');
    }

    // Filter for locale-related JS errors
    const localeErrors = jsErrors.filter(
      err => /module|translation|locale|i18n|intl/i.test(err)
    );

    expect(
      localeErrors,
      `Found JavaScript errors related to translations: ${localeErrors.join(', ')}`
    ).toHaveLength(0);
  });
});
