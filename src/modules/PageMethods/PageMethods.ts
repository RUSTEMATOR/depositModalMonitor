import {Locator, Page} from "@playwright/test";

export default class PageMethods {
    public page: Page
    private mainPageLink: string
    private signInButton: Locator
    private emailInput: Locator
    private passwordInput: Locator
    private loginSubmitButton: Locator
    private depModalButton: Locator
    private depModal: Locator
    private paymentList: Locator



    constructor(page: Page) {
        this.page = page
        this.mainPageLink = 'https://www.kingbillycasino.com/'
        this.signInButton = this.page.locator('#header_log_in_btn')
        this.emailInput = this.page.locator('#login_modal_email_input')
        this.passwordInput = this.page.locator('#login_password_input')
        this.loginSubmitButton = this.page.locator('#submit_login')
        this.depModalButton = this.page.locator('#header_dep_btn')
        this.depModal = this.page.locator('.fast-deposit-modal')
        this.paymentList = this.page.locator('.payment-methods__list')
    }

    async navigateToMainPage() {
        await this.page.goto(this.mainPageLink)
    }

    async signIn(email: string, password: string) {
        await this.signInButton.click()
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.loginSubmitButton.click()
        await this.page.waitForSelector('#header_dep_btn')
    }

    async openDepModal() {
        await this.depModalButton.click()
    }

    async screenshotDepModal(path: string) {
        await this.page.screenshot({path: path})
    }

    get getDepModal() {
        return this.depModal
    }

    get getPaymentList() {
        return this.paymentList
    }

}