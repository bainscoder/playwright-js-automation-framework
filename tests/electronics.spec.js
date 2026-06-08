import test from "../Support/Fixture/objectFixture";
test.describe("Electronics Navigation Test Cases", () => {
  test("Verify navigation to electronics page", async ({ electronics }) => {
    await electronics.navigateToElectronicsPage();
  });

  test("Verify complete checkout process", async ({ electronics, cart }) => {
    await cart.clearCart();
    await electronics.openCellPhonesCategory();
    await electronics.openFirstProduct();
    const productPrice = await electronics.getProductPrice();
    await electronics.addFirstProductToCart();
    await cart.openShoppingCart();
    await cart.verifyCartTotal(productPrice);
    await cart.verifyCheckoutFromCart();
    await cart.completeCheckout();
  });

  test("Verify cart total updates when quantity changes", async ({
    electronics,
    cart,
  }) => {
    await electronics.openCellPhonesCategory();
    await electronics.openFirstProduct();
    const productPrice = await electronics.getProductPrice();
    await electronics.addFirstProductToCart();
    await cart.openShoppingCart();
    await cart.updateProductQuantity(2);
    await cart.verifyCartTotal(productPrice * 2);
  });
});
