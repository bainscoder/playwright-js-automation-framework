import { test as setup } from "@playwright/test";
import { SignInPage } from "../Support/PageMethod/sign_In";

setup("authenticate", async ({ page }) => {
  const signInPage = new SignInPage(page);
  await signInPage.navigateToLoginPage();
  await signInPage.loginWithValidCredentials();
  await page.context().storageState({
    path: "Support/auth/user.json",
  });
});