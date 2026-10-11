// registerPage.ts
import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly firstNameError: Locator;

    readonly lastNameInput: Locator;
    readonly lastNameError: Locator;

    readonly emailInput: Locator;
    readonly emailError: Locator;


    readonly continueButton: Locator;


    constructor(page: Page) {
        this.page = page;

        this.firstNameInput = page.locator('#input-firstname');
        this.firstNameError = page.locator('.form-group').filter({ has: page.locator('#input-firstname') }).locator('.text-danger');

        this.lastNameInput = page.locator('#input-lastname');
        this.lastNameError = page.locator('.form-group').filter({ has: page.locator('#input-lastname') }).locator('.text-danger');

        this.emailInput = page.locator('#input-email');
        this.emailError = page.locator('.form-group').filter({ has: page.locator('#input-email') }).locator('.text-danger');

        this.continueButton = page.locator('input[type="submit"][value="Continue"]')
    }

    /*
    <div class="form-group row required" xpath="1">
        <label class="col-sm-2 col-form-label" for="input-firstname">First Name</label>
        <div class="col-sm-10">
            <input type="text" name="firstname" value="" placeholder="First Name" id="input-firstname" class="form-control"> </div>
        </div>

    <div class="form-group row required">
        <label class="col-sm-2 col-form-label" for="input-firstname">First Name</label>
        <div class="col-sm-10">
            <input type="text" name="firstname" value placeholder="First Name" id="input-firstname" class="form-control">
                <div class="text-danger">First Name must be between 1 and 32 characters!</div>
            </div>
        </div>	        
    
    */

    async goto() {
        await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register');
    }

    async fillPersonalDetails(firstName: string, lastName: string, email: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
    }

    async fillFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async fillEmail(Email: string) {
        await this.emailInput.fill(Email);
    }

    async getEmailValue(): Promise<string> {
        return this.emailInput.inputValue();
    }

    async submit() {
        await this.continueButton.click();
    }
}