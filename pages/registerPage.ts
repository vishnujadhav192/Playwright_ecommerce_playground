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

    readonly telePhoneInput: Locator;
    readonly telePhoneError: Locator;
    readonly telePhoneHelperText: Locator;

    readonly passwordInput: Locator;
    readonly passwordError: Locator;

    readonly confirmPasswordInput: Locator;
    readonly confirmPasswordError: Locator;

    readonly newsletterYesInput: Locator;
    readonly newsletterNoInput: Locator;

    readonly privacyPolicyLink: Locator;

    readonly modalContent: Locator;
    readonly activeModal: Locator;

    readonly modalTitle: Locator;
    readonly modalBody: Locator;
    readonly activeModalBody: Locator;


    readonly closeButton: Locator;

    readonly agreeCheckbox: Locator;

    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.firstNameInput = page.locator('#input-firstname');
        this.firstNameError = page.locator('.form-group').filter({ has: page.locator('#input-firstname') }).locator('.text-danger');

        this.lastNameInput = page.locator('#input-lastname');
        this.lastNameError = page.locator('.form-group').filter({ has: page.locator('#input-lastname') }).locator('.text-danger');

        this.emailInput = page.locator('#input-email');
        this.emailError = page.locator('.form-group').filter({ has: page.locator('#input-email') }).locator('.text-danger');

        this.telePhoneInput = page.locator('#input-telephone');
        this.telePhoneError = page.locator('.form-group').filter({ has: page.locator('#input-telephone') }).locator('.text-danger');
        this.telePhoneHelperText = page.locator('#input-telephone-help');

        this.passwordInput = page.locator('#input-password');
        this.passwordError = page.locator('.form-group').filter({ has: page.locator('#input-password') }).locator('.text-danger');

        this.confirmPasswordInput = page.locator('#input-confirm');
        this.confirmPasswordError = page.locator('.form-group').filter({ has: page.locator('#input-confirm') }).locator('.text-danger');

        this.newsletterYesInput = page.locator('#input-newsletter-yes');
        this.newsletterNoInput = page.locator('#input-newsletter-no');

        this.privacyPolicyLink = page.locator('.agree');

        this.modalContent = page.locator('.modal-content');
        this.activeModal = page.locator('.modal.show .modal-content');

        this.modalTitle = page.locator('.modal-title');
        this.modalBody = page.locator('.modal-body');
        this.activeModalBody = page.locator('.modal.show .modal-body');
        this.closeButton = page.locator('.modal-header .close');

        this.agreeCheckbox = page.locator('#input-agree');

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

    async fillPersonalDetails(firstName: string, lastName: string, email: string, telePhone: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.telePhoneInput.fill(telePhone);
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

    async fillTelephone(Telephone: string) {
        await this.telePhoneInput.fill(Telephone);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async fillConfirmPassword(confirmPassword: string) {
        await this.confirmPasswordInput.fill(confirmPassword);
    }

    async selectYes() {
        // await this.newsletterYesInput.check();
        await this.page.locator('label[for="input-newsletter-yes"]').click();
    }

    async selectNo() {
        // await this.newsletterNoInput.check();
        await this.page.locator('label[for="input-newsletter-no"]').click();

    }

    async isYesSelected(): Promise<boolean> {
        return await this.newsletterYesInput.isChecked();
    }

    async isNoSelected(): Promise<boolean> {
        return await this.newsletterNoInput.isChecked();
    }

    async openPrivacyPolicy() {
        await this.privacyPolicyLink.click();
    }

    async closePrivacyPolicy() {
        await this.closeButton.click();
    }

    async agreeToPolicy() {
        // Use getByLabel for resilience
        await this.agreeCheckbox.check({ force: true });
    }

    async isPolicyAgreed(): Promise<boolean> {
        return await this.agreeCheckbox.isChecked();
    }

    async submit() {
        await this.continueButton.click();
    }
}