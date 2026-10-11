import { test, expect } from '@playwright/test';

test('Register', async ({ page }) => {
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


});