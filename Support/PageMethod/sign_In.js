import data from "../TestData/data.json" with { type: "json" };
import { env } from "../Utils/env.js";
import {
  clickWebElement,
  inputField,
  visibilityOfElement,
} from "../Utils/generalPlaywrightMethods.js";

export class SignInPage {
  constructor(page) {
    this.page = page;

    this.loginLink = page.locator('[href="/login"]');
    this.heading = page.getByText(data.returningCustomerHeading);
    this.loginButton = page.getByRole("button", { name: "Log in" });
    this.errorMessage = page.getByText(data.errorMessageOnLogin);
    this.emailField = page.locator("#Email");
    this.passwordField = page.locator("#Password");
    this.logoutLink = page.getByText(data.logoutText);
  }

  async navigateToLoginPage() {
    await this.page.goto("/");
    await clickWebElement(this.loginLink);
    await visibilityOfElement(this.heading);
  }

  async loginWithoutCredentials() {
    await clickWebElement(this.loginButton);
    await visibilityOfElement(this.errorMessage);
  }

  async loginWithValidCredentials() {
    await inputField(this.emailField, env.email);
    await inputField(this.passwordField, env.password);
    await clickWebElement(this.loginButton);
    await visibilityOfElement(this.logoutLink);
  }

  async isUserLoggedIn() {
    try {
      return await this.logoutLink.isVisible({
        timeout: 5000,
      });
    } catch {
      return false;
    }
  }

  async reAuthenticate() {
    await this.navigateToLoginPage();
    await this.loginWithValidCredentials();
  }
}
