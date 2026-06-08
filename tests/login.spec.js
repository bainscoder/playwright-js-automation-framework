import test from "../Support/Fixture/objectFixture";
test.describe('Login Test Cases', () => {
  test.beforeEach(async ({ signIn }) => {
    // Verify user navigates to login page
    await signIn.navigateToLoginPage();
  });

  test(
    'Verify the functionality of sign in button with blank fields',
    async ({ signIn }) => {
      await signIn.loginWithoutCredentials();
    }
  );
});


