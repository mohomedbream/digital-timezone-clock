import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Sample Test Suite", () => {
  it("should login with standard credentials and add an item to the cart", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({
      url: "https://www.saucedemo.com",
    });

    const usernameInput = await testdriver.find("Username input field");
    await usernameInput.click();
    await testdriver.type("standard_user");

    const passwordInput = await testdriver.find("Password input field");
    await passwordInput.click();
    await testdriver.type("secret_sauce");

    const loginButton = await testdriver.find("Login button");
    await loginButton.click();

    // Dismiss any browser autofill/password dialog
    await testdriver.pressKeys(["escape"]);

    const productsAssertion = await testdriver.assert(
      "The Products header and inventory items are displayed"
    );
    expect(productsAssertion).toBeTruthy();

    const addToCartButton = await testdriver.find(
      "Add to cart button for Sauce Labs Backpack"
    );
    await addToCartButton.click();

    const cartAssertion = await testdriver.assert(
      "The shopping cart badge displays 1 item"
    );
    expect(cartAssertion).toBeTruthy();
  });
});
