import { expect } from "@playwright/test";
import { clickWebElement } from "../Utils/generalPlaywrightMethods.js";
import { FakerUtils } from "../Utils/faker.js";

class CartPage {
  constructor(page) {
    this.page = page;

    this.shoppingCartLink = page
      .getByRole("link", { name: /shopping cart/i })
      .first();
    this.cartQuantity = page.locator(".cart-qty").first();
    this.quantityInput = page.locator(".qty-input");
    this.updateCartButton = page
      .getByRole("button", { name: "Update shopping cart" })
      .first();
    this.productSubtotal = page.locator(".product-subtotal");
    this.removeCheckbox = page.locator('[name="removefromcart"]');
    this.termAndServicesCheckbox = page.locator("#termsofservice").first();
    this.checkoutBtn = page.locator("#checkout").first();
    this.cityInput = page.locator("#BillingNewAddress_City");
    this.address1Input = page.locator("#BillingNewAddress_Address1");
    this.zipCodeInput = page.locator("#BillingNewAddress_ZipPostalCode");
    this.phoneNumberInput = page.locator("#BillingNewAddress_PhoneNumber");
    this.continueButton = page.locator('[title="Continue"]').first();
    this.billingContinueButton = page.locator('[title="Continue"]').first();
    this.shippingAddressContinueButton = page
      .locator('[title="Continue"]')
      .last();
    this.shippingMethodContinueButton = page.locator(
      "#shipping-method-buttons-container input",
    );
    this.paymentMethodContinueButton = page.locator(
      "#payment-method-buttons-container input",
    );
    this.paymentInfoContinueButton = page.locator(
      "#payment-info-buttons-container input",
    );
    this.confirmOrderButton = page.locator(
      "#confirm-order-buttons-container input",
    );
    this.countryDropdown = page.getByLabel("Country:");
    this.shippingAddressHeading = page
      .locator("h2")
      .filter({ hasText: "Shipping address" });
    this.shippingMethodHeading = page
      .locator("h2")
      .filter({ hasText: "Shipping method" });
    this.paymentMethodHeading = page
      .locator("h2")
      .filter({ hasText: "Payment method" });
    this.paymentInformationHeading = page
      .locator("h2")
      .filter({ hasText: "Payment information" });
    this.confirmOrderHeading = page
      .locator("h2")
      .filter({ hasText: "Confirm order" });
    this.cashOnDeliveryRadioButton = page.getByLabel("Cash On Delivery (COD)");
    this.paymentInformationText = page.getByText("You will pay by COD");
    this.orderSuccessMessage = page.getByText(
      "Your order has been successfully processed!",
    );

    this.billingAddressDropdown = page
      .locator("#billing-address-select")
      .first();
  }

  /**
   * Open Shopping Cart
   */
  async openShoppingCart() {
    await clickWebElement(this.shoppingCartLink);
    await expect(this.page).toHaveURL(/cart/);
  }

  /**
   * Verify Product Added
   */
  async verifyProductAddedToCart() {
    await expect(this.cartQuantity).not.toHaveText("(0)");
  }

  /**
   * Get Cart Quantity
   */
  async getCartQuantity() {
    return (await this.cartQuantity.textContent()) ?? "";
  }

  /**
   * Update Product Quantity
   */
  async updateProductQuantity(quantity) {
    await this.quantityInput.fill(quantity.toString());
    await clickWebElement(this.updateCartButton);
    await expect(this.quantityInput).toHaveValue(quantity.toString());
  }

  /**
   * Get Cart Total
   */
  async getCartTotal() {
    const totalText = await this.productSubtotal.first().textContent();
    return Number(totalText?.replace("$", "").trim());
  }

  /**
   * Verify Cart Total
   */
  async verifyCartTotal(expectedAmount) {
    const actualAmount = await this.getCartTotal();
    expect(actualAmount).toBe(expectedAmount);
  }

  /**
   * Remove Product From Cart
   */
  async clearCart() {
    await this.openShoppingCart();

    const itemCount = await this.removeCheckbox.count();

    if (itemCount > 0) {
      for (let i = 0; i < itemCount; i++) {
        await this.removeCheckbox.nth(i).check();
      }

      await clickWebElement(this.updateCartButton);
    }
  }

  /**
   * Checkout From Cart
   */
  async verifyCheckoutFromCart() {
    await this.termAndServicesCheckbox.check();
    await expect(this.termAndServicesCheckbox).toBeChecked();

    await clickWebElement(this.checkoutBtn);
    await expect(this.page).toHaveURL(/onepagecheckout/);
  }

  async completeCheckout() {
    const address = FakerUtils.generateBillingAddress();

    // Billing Address
    if (await this.billingAddressDropdown.isVisible()) {
      const selectedOption = await this.billingAddressDropdown
        .locator("option:checked")
        .textContent();

      if (selectedOption && !selectedOption.includes("New Address")) {
        // Existing address selected
        await clickWebElement(this.billingContinueButton);
      } else {
        // New Address selected
        await this.countryDropdown.selectOption({ label: "India" });
        await this.cityInput.fill(address.city);
        await this.address1Input.fill(address.address1);
        await this.zipCodeInput.fill(address.zipCode);
        await this.phoneNumberInput.fill(address.phoneNumber);

        await clickWebElement(this.billingContinueButton);
      }
    } else {
      // Billing form already visible
      await clickWebElement(this.billingContinueButton);
    }

    // Shipping Address
    await expect(this.shippingAddressHeading).toBeVisible();
    await clickWebElement(this.shippingAddressContinueButton);

    // Shipping Method
    await expect(this.shippingMethodHeading).toBeVisible();
    await clickWebElement(this.shippingMethodContinueButton);

    // Payment Method
    await expect(this.paymentMethodHeading).toBeVisible();
    await this.cashOnDeliveryRadioButton.check();
    await clickWebElement(this.paymentMethodContinueButton);

    // Payment Information
    await expect(this.paymentInformationText).toBeVisible();
    await clickWebElement(this.paymentInfoContinueButton);

    // Confirm Order
    await expect(this.confirmOrderHeading).toBeVisible();
    await clickWebElement(this.confirmOrderButton);

    // Success
    await expect(this.orderSuccessMessage).toBeVisible();
  }
}

export { CartPage };
