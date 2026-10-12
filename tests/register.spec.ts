// register.spec.ts
import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import { Validators } from '../utils/validators';

let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
});

test('First Name empty validation message', async ({ page }) => {
    //    const registerPage = new RegisterPage(page);

    const firstNameErrorMsg = 'First Name must be between 1 and 32 characters!';

    //    await registerPage.goto();
    await registerPage.fillFirstName('');   // leave blank  

    await registerPage.submit();

    await expect(registerPage.firstNameInput).toHaveValue('');

    await expect(registerPage.firstNameError).toBeVisible();
    await expect(registerPage.firstNameError).toHaveText(firstNameErrorMsg);

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
    //    const registerPage = new RegisterPage(page);

    const firstNameErrorMsg = 'First Name must be between 1 and 32 characters!';

    //    await registerPage.goto();
    await registerPage.fillFirstName('1'.repeat(60)); // too long

    await registerPage.submit();

    // 1️⃣ Assert the value in the input (browser may truncate or keep full string)
    const firstNameValue = await registerPage.firstNameInput.inputValue();
    expect(firstNameValue.length).toBeGreaterThan(32); // confirm what was entered

    await expect(registerPage.firstNameError).toBeVisible();
    await expect(registerPage.firstNameError).toHaveText(firstNameErrorMsg);
});

test('Last Name empty validation message', async ({ page }) => {
    // const registerPage = new RegisterPage(page);

    const lastNameErrorMsg = 'Last Name must be between 1 and 32 characters!';

    // await registerPage.goto();
    await registerPage.fillLastName('');   // leave blank  

    await registerPage.submit();

    await expect(registerPage.lastNameInput).toHaveValue('');

    await expect(registerPage.lastNameError).toBeVisible();
    await expect(registerPage.lastNameError).toHaveText(lastNameErrorMsg);
});

test('Last Name max length validation message', async ({ page }) => {
    // const registerPage = new RegisterPage(page);

    const lastNameErrorMsg = 'Last Name must be between 1 and 32 characters!';

    // await registerPage.goto();
    await registerPage.fillLastName('1'.repeat(60)); // too long

    await registerPage.submit();

    // 1️⃣ Assert the value in the input (browser may truncate or keep full string)
    const lastNameValue = await registerPage.lastNameInput.inputValue();
    expect(lastNameValue.length).toBeGreaterThan(32); // confirm what was entered

    await expect(registerPage.lastNameError).toBeVisible();
    await expect(registerPage.lastNameError).toHaveText(lastNameErrorMsg);
});

test('Email empty validation message', async ({ page }) => {
    // const registerPage = new RegisterPage(page);

    const emailErrorMsg = 'E-Mail Address does not appear to be valid!';

    // await registerPage.goto();
    await registerPage.fillEmail('');   // leave blank  

    await registerPage.submit();

    await expect(registerPage.emailInput).toHaveValue('');

    await expect(registerPage.emailError).toBeVisible();
    await expect(registerPage.emailError).toHaveText(emailErrorMsg);
});

test('Email validation message 1', async ({ page }) => {
    // const registerPage = new RegisterPage(page);

    // await registerPage.goto();
    await registerPage.fillEmail('A');

    await registerPage.submit();

    const email = await registerPage.getEmailValue();

    // Cast to HTMLInputElement so TS knows validationMessage exists
    const validationMessage = await page.locator('input[type="email"]').evaluate(
        el => (el as HTMLInputElement).validationMessage
    );

    expect(validationMessage).toContain("Please include an '@' in the email address.");
});

test('Email validation message 2', async ({ page }) => {
    // const registerPage = new RegisterPage(page);

    // await registerPage.goto();
    await registerPage.fillEmail('A@');

    await registerPage.submit();

    const email = await registerPage.getEmailValue();

    // Cast to HTMLInputElement so TS knows validationMessage exists
    const validationMessage = await page.locator('input[type="email"]').evaluate(
        el => (el as HTMLInputElement).validationMessage
    );

    expect(validationMessage).toContain("Please enter a part following '@'.");
});

test('Email validation message 3', async ({ page }) => {
    // const registerPage = new RegisterPage(page);

    // await registerPage.goto();
    await registerPage.fillEmail('johnexample.com');

    await registerPage.submit();

    const email = await registerPage.getEmailValue();

    // Cast to HTMLInputElement so TS knows validationMessage exists
    const validationMessage = await page.locator('input[type="email"]').evaluate(
        el => (el as HTMLInputElement).validationMessage
    );

    expect(validationMessage).toContain("Please include an '@' in the email address.");
});

test('Email validation message 4', async ({ page }) => {
    // const registerPage = new RegisterPage(page);

    const emailErrorMsg = 'E-Mail Address does not appear to be valid!';

    // await registerPage.goto();
    await registerPage.fillEmail('johnexample@com');

    await registerPage.submit();

    const email = await registerPage.getEmailValue();
    expect(Validators.isValidEmail(email)).toBe(false);

    await expect(registerPage.emailError).toBeVisible();
    await expect(registerPage.emailError).toHaveText(emailErrorMsg);
});

test('Telephone empty validation message', async ({ page }) => {
    // const registerPage = new RegisterPage(page);

    const telePhoneErrorMsg = 'Telephone must be between 3 and 32 characters!';
    const telePhoneHelperMsg = 'Enter valid phone number with country code!';

    // await registerPage.goto();
    await registerPage.fillTelephone('');   // leave blank  

    await registerPage.submit();

    await expect(registerPage.telePhoneInput).toHaveValue('');

    await expect(registerPage.telePhoneError).toBeVisible();
    await expect(registerPage.telePhoneError).toHaveText(telePhoneErrorMsg);

    await expect(registerPage.telePhoneHelperText).toBeVisible();
    await expect(registerPage.telePhoneHelperText).toHaveText(telePhoneHelperMsg);
});

test('Telephone max length validation message', async ({ page }) => {
    // const registerPage = new RegisterPage(page);

    const telePhoneErrorMsg = 'Telephone must be between 3 and 32 characters!';
    const telePhoneHelperMsg = 'Enter valid phone number with country code!';

    // await registerPage.goto();
    await registerPage.fillTelephone('1'.repeat(60)); // too long

    await registerPage.submit();

    // 1️⃣ Assert the value in the input (browser may truncate or keep full string)
    const telePhoneValue = await registerPage.telePhoneInput.inputValue();
    expect(telePhoneValue.length).toBeGreaterThan(32); // confirm what was entered

    await expect(registerPage.telePhoneError).toBeVisible();
    await expect(registerPage.telePhoneError).toHaveText(telePhoneErrorMsg);

    await expect(registerPage.telePhoneHelperText).toBeVisible();
    await expect(registerPage.telePhoneHelperText).toHaveText(telePhoneHelperMsg);
});

test('Password empty validation message', async ({ page }) => {
    // const registerPage = new RegisterPage(page);

    const passWordErrorMsg = 'Password must be between 4 and 20 characters!';

    // await registerPage.goto();
    await registerPage.fillPassword('');   // leave blank  

    await registerPage.submit();

    await expect(registerPage.passwordInput).toHaveValue('');

    await expect(registerPage.passwordError).toBeVisible();
    await expect(registerPage.passwordError).toHaveText(passWordErrorMsg);
});

test('Password minimum length validation message', async ({ page }) => {
    // const registerPage = new RegisterPage(page);

    const passWordErrorMsg = 'Password must be between 4 and 20 characters!';

    // await registerPage.goto();
    await registerPage.fillPassword('1'.repeat(3));

    await registerPage.submit();

    const passwordValue = await registerPage.passwordInput.inputValue();
    expect(passwordValue.length).toBeLessThan(4); // confirm what was entered

    await expect(registerPage.passwordError).toBeVisible();
    await expect(registerPage.passwordError).toHaveText(passWordErrorMsg);
});

test('Confirm password mismatch validation', async ({ page }) => {
    // const registerPage = new RegisterPage(page);

    const passWordErrorMsg = 'Password confirmation does not match password!';

    // await registerPage.goto();
    await registerPage.fillPassword('1'.repeat(5));
    await registerPage.fillConfirmPassword('1'.repeat(10));

    await registerPage.submit();

    const passwordValue = await registerPage.passwordInput.inputValue();
    const confirmPasswordValue = await registerPage.confirmPasswordInput.inputValue();

    await expect(registerPage.confirmPasswordError).toBeVisible();
    await expect(registerPage.confirmPasswordError).toHaveText(passWordErrorMsg);
});

test('Confirm password empty validation', async ({ page }) => {
    // const registerPage = new RegisterPage(page);

    const passWordErrorMsg = 'Password confirmation does not match password!';

    // await registerPage.goto();
    await registerPage.fillPassword('1'.repeat(5));

    await registerPage.submit();

    const passwordValue = await registerPage.passwordInput.inputValue();
    const confirmPasswordValue = await registerPage.confirmPasswordInput.inputValue();

    await expect(registerPage.confirmPasswordError).toBeVisible();
    await expect(registerPage.confirmPasswordError).toHaveText(passWordErrorMsg);
});

test('Newsletter Subscribe Yes check', async ({ page }) => {
    // const registerPage = new RegisterPage(page);

    // await registerPage.goto();
    await registerPage.selectYes();

    await registerPage.submit();
    expect(await registerPage.isYesSelected()).toBeTruthy();
});

test('Newsletter Subscribe No check', async ({ page }) => {
    // const registerPage = new RegisterPage(page);

    // await registerPage.goto();

    await registerPage.selectNo();
    await registerPage.submit();
    expect(await registerPage.isNoSelected()).toBeTruthy();
});

test('Privacy Policy agreement check', async ({ page }) => {
    // const registerPage = new RegisterPage(page);

    // await registerPage.goto();

    // Step 1: Open modal
    await registerPage.openPrivacyPolicy();

    // Step 2: Assertions
    await registerPage.activeModal.waitFor({ state: 'visible' });
    await expect(registerPage.activeModal).toBeVisible();
    await expect(registerPage.modalTitle).toHaveText('Privacy Policy');
    await expect(registerPage.activeModalBody).toContainText('Privacy Policy');

    // Step 3: Close modal
    await registerPage.closePrivacyPolicy();

    // Step 4: Assert modal is hidden
    await expect(registerPage.activeModal).toBeHidden();

    await registerPage.agreeToPolicy();
    expect(await registerPage.isPolicyAgreed()).toBeTruthy();
});

test('register a new account', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Your Store/);
    // Hover over "My account"
    await page.locator('a.nav-link.dropdown-toggle >> text=My account').click();

    //  await page.getByRole('link', { name: 'Register', exact: true }).click();

    await expect(page.locator('div.card-body.p-4 h2').first()).toHaveText('New Customer');

    // const cardBody = page.locator('div.card-body.p-4');
    // await expect(cardBody.locator('h2')).toHaveText('New Customer');

    // const headings = await page.locator('h2').allTextContents();
    // console.log(headings);

    // const headings = await page.locator('h2').allInnerTexts();
    // console.log(headings);

    // const btn = page.locator('.btn.btn-primary');
    // await btn.nth(1).click();

    /*
    
    1) <a role="button" target="_self" class="icon-right both btn btn-primary btn-lg btn-block" href="https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart">…</a> aka getByRole('button', { name: ' Edit cart' })
    2) <a class="btn btn-primary" href="https://ecommerce-playground.lambdatest.io/index.php?route=account/register">Continue</a> aka getByRole('link', { name: 'Continue' })
    3) <input type="submit" value="Login" class="btn btn-primary"/> aka getByRole('button', { name: 'Login' })
    4) <a href="#" data-show="0" role="button" id="back-to-top" class="btn btn-primary shadow back-to-top">…</a> aka locator('#back-to-top')
    
    */

    const btn = page.locator('a.btn.btn-primary');
    await btn.nth(1).click();

    /*
    1) <a role="button" target="_self" class="icon-right both btn btn-primary btn-lg btn-block" href="https://ecommerce-playground.lambdatest.io/index.php?route=checkout/cart">…</a> aka getByRole('button', { name: ' Edit cart' })
    2) <a class="btn btn-primary" href="https://ecommerce-playground.lambdatest.io/index.php?route=account/register">Continue</a> aka getByRole('link', { name: 'Continue' })
    3) <a href="#" data-show="0" role="button" id="back-to-top" class="btn btn-primary shadow back-to-top">…</a> aka locator('#back-to-top')
    
    */

    // await page.waitForSelector('h1');
    // const headings = await page.locator('h1').allTextContents();
    // console.log(headings);

    // const firstName = page.locator('#input-firstname');
    // await firstName.fill('Peter');

    // 1. Assert no error message on page load
    const errorMsg = page.locator('.text-danger');
    await expect(errorMsg).toHaveCount(0);

    // const registerPage = new RegisterPage(page);

    // await registerPage.goto();
    await registerPage.fillPersonalDetails('FName', 'LName', 'FN@LName.com', '+91 0000000000');

    await registerPage.fillPassword('StrongPass123!');
    await registerPage.fillConfirmPassword('StrongPass123!');

    // Subscribe to newsletter (optional)
    await registerPage.selectYes();

    // Agree to privacy policy
    await registerPage.agreeToPolicy();

    // Submit the form
    await registerPage.submit();

    // ✅ Assertion: check if registration succeeded
    await expect(page.locator('h1')).toHaveText('Your Account Has Been Created!');
    await expect(page.locator('text=Congratulations! Your new account has been successfully created!')).toBeVisible();

});