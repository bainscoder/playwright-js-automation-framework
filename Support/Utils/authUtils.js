import { SignInPage } from "../PageMethod/sign_In.js";

export async function ensureAuthenticated(page) {
  const signInPage = new SignInPage(page);

  await page.goto("/");

  const loggedIn = await signInPage.isUserLoggedIn();

  if (!loggedIn) {
    console.log("Session expired. Re-authenticating...");
    await signInPage.reAuthenticate();
  }
}