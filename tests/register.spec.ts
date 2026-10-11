// register.spec.ts
import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import { Validators } from '../utils/validators';

test('First Name empty validation message', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.fillFirstName('');   // leave blank  

    await registerPage.submit();

    await expect(registerPage.firstNameInput).toHaveValue('');

    await expect(registerPage.firstNameError).toBeVisible();
    await expect(registerPage.firstNameError).toHaveText('First Name must be between 1 and 32 characters!');

    /*

    This should be in spec ts file but as validation is on register page. Moving assertion to ts file.

    <div class="form-group row required">
        <label class="col-sm-2 col-form-label" for="input-firstname">First Name</label>
        <div class="col-sm-10">
            <input type="text" name="firstname" value placeholder="First Name" id="input-firstname" class="form-control">
                <div class="text-danger">First Name must be between 1 and 32 characters!</div>
            </div>
        </div>	
    
    const firstNameError = page.locator('.form-group').filter({ has: page.locator('#input-firstname') }).locator('.text-danger');

    await expect(firstNameError).toHaveText('First Name must be between 1 and 32 characters!');


    */

});

test('First Name max length validation message', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.fillFirstName('1'.repeat(60)); // too long

    await registerPage.submit();

    // 1️⃣ Assert the value in the input (browser may truncate or keep full string)
    const firstNameValue = await registerPage.firstNameInput.inputValue();
    expect(firstNameValue.length).toBeGreaterThan(32); // confirm what was entered

    await expect(registerPage.firstNameError).toBeVisible();
    await expect(registerPage.firstNameError).toHaveText('First Name must be between 1 and 32 characters!');

});

test('Last Name empty validation message', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.fillLastName('');   // leave blank  

    await registerPage.submit();

    await expect(registerPage.lastNameInput).toHaveValue('');

    await expect(registerPage.lastNameError).toBeVisible();
    await expect(registerPage.lastNameError).toHaveText('Last Name must be between 1 and 32 characters!');

});

test('Last Name max length validation message', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.fillLastName('1'.repeat(60)); // too long

    await registerPage.submit();

    // 1️⃣ Assert the value in the input (browser may truncate or keep full string)
    const lastNameValue = await registerPage.lastNameInput.inputValue();
    expect(lastNameValue.length).toBeGreaterThan(32); // confirm what was entered

    await expect(registerPage.lastNameError).toBeVisible();
    await expect(registerPage.lastNameError).toHaveText('Last Name must be between 1 and 32 characters!');

});

test('Email empty validation message', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.fillEmail('');   // leave blank  

    await registerPage.submit();

    await expect(registerPage.emailInput).toHaveValue('');

    await expect(registerPage.emailError).toBeVisible();
    await expect(registerPage.emailError).toHaveText('E-Mail Address does not appear to be valid!');

});

test('Email validation message 1', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.fillEmail('A');   // leave blank  

    await registerPage.submit();

    const email = await registerPage.getEmailValue();

    // Cast to HTMLInputElement so TS knows validationMessage exists
    const validationMessage = await page.locator('input[type="email"]').evaluate(
        el => (el as HTMLInputElement).validationMessage
    );

    expect(validationMessage).toContain("Please include an '@' in the email address.");
});

test('Email validation message 2', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.fillEmail('A@');   // leave blank  

    await registerPage.submit();

    const email = await registerPage.getEmailValue();

    // Cast to HTMLInputElement so TS knows validationMessage exists
    const validationMessage = await page.locator('input[type="email"]').evaluate(
        el => (el as HTMLInputElement).validationMessage
    );

    expect(validationMessage).toContain("Please enter a part following '@'.");
});

test('Email validation message 3', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.fillEmail('johnexample.com');   // leave blank  

    await registerPage.submit();

    const email = await registerPage.getEmailValue();

    // Cast to HTMLInputElement so TS knows validationMessage exists
    const validationMessage = await page.locator('input[type="email"]').evaluate(
        el => (el as HTMLInputElement).validationMessage
    );

    expect(validationMessage).toContain("Please include an '@' in the email address.");
});

test('Email validation message 4', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.fillEmail('johnexample@com');   // leave blank  

    await registerPage.submit();

    const email = await registerPage.getEmailValue();
    expect(Validators.isValidEmail(email)).toBe(false);

    await expect(registerPage.emailError).toBeVisible();
    await expect(registerPage.emailError).toHaveText('E-Mail Address does not appear to be valid!');
});


test('register a new account', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.fillPersonalDetails('FName', 'LName','FN@LName.com');
});