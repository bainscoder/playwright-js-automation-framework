import { expect } from "@playwright/test";

export async function inputField(locator, str) {
  await locator.waitFor({ state: "visible", timeout: 60000 });
  await locator.fill(str);
  await expect(locator).toHaveValue(str);
}

export async function clickWebElement(locator, str) {
  await locator.waitFor({ state: "visible", timeout: 60000 });

  if (str) {
    await expect(locator).toHaveText(str);
  }

  await locator.click();
}

export async function goToPage(page, url) {
  await page.goto(url);
  await page.waitForLoadState("networkidle");
  await page.waitForLoadState("domcontentloaded");
}

export async function visibilityOfElement(locator, text) {
  await expect(locator).toBeVisible({ timeout: 90000 });

  if (text) {
    const textValue = await locator.textContent();
    expect(textValue?.trim()).toContain(text);
  }
}

export async function assertPageUrl(page, urlEndPoint) {
  const currentUrl = page.url();
  expect(currentUrl).toContain(urlEndPoint);
}