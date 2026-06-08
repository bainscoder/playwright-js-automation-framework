import { expect } from "@playwright/test";
import data from "../TestData/data.json" with { type: "json" };
import {
  clickWebElement,
  inputField,
} from "../Utils/generalPlaywrightMethods.js";

export class HomePage {
  constructor(page) {
    this.page = page;

    this.logo = page.locator(".header-logo");
    this.searchBox = page.locator('[value="Search store"]');
    this.searchButtonWithValue = page.locator('[value="Search"]');
    this.searchButtonWithoutValue = page.locator('[value="Search"]');

    this.featuredProductsHeading = page.getByText(
      data.featuredProductsHeading
    );

    this.welcomeMessage = page.getByText(data.welcomeMessage);

    this.userEmail = page.getByRole("link", {
      name: /@gmail\.com/i,
    });

    this.logoutLink = page.getByText("Log out");
    this.shoppingCartLink = page.locator(".cart-label").first();

    this.searchResultProduct = page.locator(".ui-menu-item a");
    this.smartphoneLink = page.locator(".ui-menu-item a");

    this.featuredProducts = page.locator(".product-item");

    this.noResultMessage = page.getByText("No products were found");

    this.searchValidationMessage = page.getByText(
      "Search term minimum length is 3 characters"
    );
  }

  async navigateToHomePage() {
    await this.page.goto("/");
  }

  async verifyHomePageLoaded() {
    const elements = [
      this.logo,
      this.searchBox,
      this.featuredProductsHeading,
      this.welcomeMessage,
    ];

    for (const element of elements) {
      await expect(element).toBeVisible();
    }
  }

  async verifyLoggedInUser() {
    const elements = [
      this.userEmail,
      this.logoutLink,
      this.shoppingCartLink,
    ];

    for (const element of elements) {
      await expect(element).toBeVisible();
    }
  }

  async searchProduct(productName) {
    await inputField(this.searchBox, productName);
  }

  async verifySearchResults() {
    await expect(this.searchResultProduct).toBeVisible();
  }

  async openSearchResultProduct() {
    await clickWebElement(this.smartphoneLink);
  }

  async verifyFeaturedProductsDisplayed() {
    await expect(this.featuredProducts.first()).toBeVisible();

    const productCount = await this.featuredProducts.count();
    expect(productCount).toBeGreaterThan(0);
  }

  async verifyNoSearchResults() {
    await clickWebElement(this.searchButtonWithValue);
    await expect(this.noResultMessage).toBeVisible();
  }

  async verifyAlertPopupMessage() {
    this.page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe(
        "Please enter some search keyword"
      );
      await dialog.accept();
    });

    await clickWebElement(this.searchButtonWithoutValue);
  }

  async verifySearchValidationMessage() {
    await clickWebElement(this.searchButtonWithValue);
    await expect(this.searchValidationMessage).toBeVisible();
  }
}