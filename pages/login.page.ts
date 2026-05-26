import { Page, Locator } from '@playwright/test'
import * as allure from 'allure-js-commons'
import { BasePage } from './base.page'
import { LogHelper } from '@utils/logger'
import { expect } from '@playwright/test'

/**
 * Login page class
 */
export class LoginPage extends BasePage {
    /**
     * Readonly locator variable
     */
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    readonly errorMessage: Locator

    /**
     * Constructor method
     */
    constructor(page: Page) {
        super(page)

        /**
         * Initialize the locator variable
         */
        this.usernameInput = page.locator('[data-test="username"]')
        this.passwordInput = page.locator('[data-test="password"]')
        this.loginButton = page.locator('[data-test="login-button"]')
        this.errorMessage = page.locator('[data-test="error"]')
    }

    /**
     * Method to enter username
     * @param username - username to enter
     * @returns Promise<this>
     */
    async enterUsername(username: string): Promise<this> {
        await allure.step(`Entering username: ${username}`, async () => {
            LogHelper.step(`Entering username: ${username}`)
            await this.fill(this.usernameInput, username)
        })
        return this
    }

    /**
     * Method to enter password
     * @param password - password to enter
     * @returns Promise<this>
     */
    async enterPassword(password: string): Promise<this> {
        await allure.step('Enter password', async () => {
            const masked = password ? '*'.repeat(password.length) : ''
            LogHelper.step(`Entering password: ${masked}`)
            await this.fill(this.passwordInput, password || '')
        })
        return this
    }

    /**
     * Method to click on login button
     */
    async clickLoginButton(): Promise<void> {
        await allure.step('Click on login button', async () => {
            LogHelper.step('Clicking on login button')
            await this.click(this.loginButton)
        })
    }

    /**
     * Login method to perform login action
     * @param username - username to login with
     * @param password - password to login with
     */
    async login(username: string, password: string): Promise<void> {
        await allure.step('Perform login flow', async () => {
            await this.enterUsername(username)
            await this.enterPassword(password)
            await this.clickLoginButton()
        })
    }
}
