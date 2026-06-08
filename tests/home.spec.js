import test from "../Support/Fixture/objectFixture";
import data from "../Support/TestData/data.json" with { type: "json" };

test.describe("Home Page Test Cases", () => {
  test("Verify home page loads successfully", async ({ home }) => {
    await home.navigateToHomePage();
    await home.verifyHomePageLoaded();
  });

  test("Verify logged in user details are displayed", async ({ home }) => {
    await home.navigateToHomePage();
    await home.verifyLoggedInUser();
  });

  test("Verify user can search product", async ({ home }) => {
    await home.navigateToHomePage();
    await home.searchProduct(data.searchProduct);
    await home.verifySearchResults();
  });

  test("Verify user can open product from search results", async ({ home }) => {
    await home.navigateToHomePage();
    await home.searchProduct("Smartphone");
    await home.openSearchResultProduct();
  });

  test("Verify featured products are displayed on home page", async ({
    home,
  }) => {
    await home.navigateToHomePage();
    await home.verifyFeaturedProductsDisplayed();
  });

  test("Verify search with invalid product", async ({ home }) => {
    await home.navigateToHomePage();
    await home.searchProduct(data.invalidProduct);
    await home.verifyNoSearchResults();
  });

  test("Verify search with empty value", async ({ home }) => {
    await home.navigateToHomePage();
    await home.searchProduct("");
    await home.verifyAlertPopupMessage();
  });

  test("Verify minimum search criteria validation", async ({ home }) => {
    await home.navigateToHomePage();
    await home.searchProduct("a");
    await home.verifySearchValidationMessage();
  });
});
