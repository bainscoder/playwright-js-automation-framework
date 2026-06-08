// import {test as baseTest} from "@playwright/test";
// import signInPage from "../PageMethod/sign_In";

// const test = baseTest.extend({
//   signin: async ({ page, isMobile }, use) => {
//     const signin = new signInPage(page, isMobile);
//     await use(signin);
//   },
// });

// export default test;


import { test as baseTest } from "@playwright/test";
import { SignInPage } from "../PageMethod/sign_In.js";
import { ElectronicsPage } from "../PageMethod/electronics.js";
import { ensureAuthenticated } from "../Utils/authUtils.js";
import { CartPage } from "../PageMethod/cartPage.js";
import { HomePage } from "../PageMethod/homePage.js";

const test = baseTest.extend({
  signIn: async ({ page }, use) => {
    await use(new SignInPage(page));
  },

  electronics: async ({ page }, use) => {
    await ensureAuthenticated(page);
    await use(new ElectronicsPage(page));
  },

  cart: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export default test;