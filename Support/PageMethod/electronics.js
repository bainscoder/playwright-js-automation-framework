import { expect } from "@playwright/test";
import { clickWebElement } from "../Utils/generalPlaywrightMethods.js";
import { validateApiResponse } from "../Utils/apiUtils.js";

export class ElectronicsPage {
  constructor(page) {
    this.page = page;

    this.electronicsTab = page
      .getByRole("link", { name: "Electronics" })
      .first();

    this.cellPhonesCategory = page
      .locator(".sub-category-grid .item-box .title")
      .last();

    this.firstProduct = page
      .locator(".product-item .product-title a")
      .first();

    this.productPrice = page.locator('[itemprop="price"]');

    this.addToCartButton = page
      .getByRole("button", { name: "Add to cart" })
      .first();

    this.successNotification = page.locator(".content");
  }

  async navigateToElectronicsPage() {
    await this.page.goto("/");

    const responsePromise = validateApiResponse(
      this.page,
      "/electronics"
    );

    await clickWebElement(this.electronicsTab);
    await responsePromise;

    await expect(this.page).toHaveURL(/electronics/);
  }

  async openCellPhonesCategory() {
    await this.navigateToElectronicsPage();

    const responsePromise = validateApiResponse(
      this.page,
      "/cell-phones"
    );

    await clickWebElement(this.cellPhonesCategory);
    await responsePromise;

    await expect(this.page).toHaveURL(/cell-phones/);
  }

  async openFirstProduct() {
    await clickWebElement(this.firstProduct);
    await expect(this.page).toHaveURL(/smartphone/);
  }

  async getProductPrice() {
    const priceText = await this.productPrice.textContent();
    return Number(priceText?.replace("$", "").trim());
  }

  async addFirstProductToCart() {
    await clickWebElement(this.addToCartButton);

    await expect(this.successNotification).toContainText(
      "The product has been added to your shopping cart"
    );
  }

  async verifyProductAddedToCart() {
    await expect(this.successNotification).toBeVisible();
  }
}