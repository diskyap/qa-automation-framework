import { Page, Locator, expect } from '@playwright/test'
import * as allure from 'allure-js-commons'
import { BasePage } from './base.page'
import { LogHelper } from '@utils/logger'

/**
 * Inventory page class
 */
export class CheckoutPage extends BasePage {
    /**
     * Readonly locator variable
     */
    readonly checkoutButton: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly postalCodeInput: Locator
    readonly continueButton: Locator
    readonly finishButton: Locator
    readonly successMessage: Locator
    readonly errorMessage: Locator
    readonly cancelButton: Locator
    readonly subTotal: Locator
    readonly taxTotal: Locator
    readonly totalCheckout: Locator

    /**
     * Constructor method
     */
    constructor(page: Page) {
        super(page)

        /**
         * Initialize the locator variable
         */
        this.checkoutButton = page.locator('[data-test="checkout"]')
        this.firstNameInput = page.locator('[data-test="firstName"]')
        this.lastNameInput = page.locator('[data-test="lastName"]')
        this.postalCodeInput = page.locator('[data-test="postalCode"]')
        this.continueButton = page.locator('[data-test="continue"]')
        this.finishButton = page.locator('[data-test="finish"]')
        this.successMessage = page.locator('[data-test="complete-header"]')
        this.errorMessage = page.locator('[data-test="error"]')
        this.cancelButton = page.locator('[data-test="cancel"]')
        this.subTotal = page.locator('[data-test="subtotal-label"]')
        this.taxTotal = page.locator('[data-test="tax-label"]')
        this.totalCheckout = page.locator('[data-test="total-label"]')
    }

    async clickCheckoutButton(): Promise<void> {
        await allure.step('Click on checkout button', async () => {
            LogHelper.step('Click on checkout button')
            await this.click(this.checkoutButton)
        })
    }

    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await allure.step('Fill checkout form', async () => {
            LogHelper.step('Fill checkout form')
            await this.fill(this.firstNameInput, firstName)
            await this.fill(this.lastNameInput, lastName)
            await this.fill(this.postalCodeInput, postalCode)
        })
    }

    async continueCheckout(): Promise<void> {
        await allure.step('Continue checkout', async () => {
            LogHelper.step('Continue checkout')
            await this.click(this.continueButton)
        })
    }

    async finishCheckout(): Promise<void> {
        await allure.step('Finish checkout', async () => {
            LogHelper.step('Finish checkout')
            await this.click(this.finishButton)
        })
    }

    async checkoutFlow(checkoutData: { firstName: string; lastName: string; postalCode: string }): Promise<void> {
        await allure.step('Perform flow checkout', async () => {
            LogHelper.step('Perform checkout')
            await this.fillCheckoutForm(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode)
            await this.continueCheckout()
            await this.finishCheckout()
        })
    }

    async cancelCheckout(): Promise<void> {
        await allure.step('Cancel checkout', async () => {
            LogHelper.step('Cancel checkout')
            await this.click(this.cancelButton)
        })
    }

    async checkout(checkoutData: { firstName: string; lastName: string; postalCode: string }): Promise<void> {
        await allure.step('Perform flow checkout with error', async () => {
            LogHelper.step('Perform checkout with error')
            await this.fillCheckoutForm(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode)
            await this.continueCheckout()
        })
    }

    async getCheckoutTotalPrice(): Promise<string> {
        await allure.step('Get checkout total price', async () => {
            LogHelper.step('Get checkout total price')
        })
        return (await this.totalCheckout.textContent())?.replace('Total: $', '') || ''
    }

    async getItemTotal(): Promise<string> {
        await allure.step('Get item total', async () => {
            LogHelper.step('Get item total')
        })
        return (await this.subTotal.textContent())?.replace('Item total: $', '') || ''
    }

    async getCheckoutTaxPrice(): Promise<string> {
        await allure.step('Get checkout tax price', async () => {
            LogHelper.step('Get checkout tax price')
        })
        return (await this.taxTotal.textContent())?.replace('Tax: $', '') || ''
    }

    async verifyCheckoutSuccess(expectedMessage: string): Promise<void> {
        await allure.step('Verify checkout success', async () => {
            LogHelper.step('Verify checkout success')
            await this.successMessage.textContent().then((text) => {
                expect(text).toContain(expectedMessage)
            })
        })
    }

    async verifyCheckoutTotalPrice(actualPrice: string): Promise<void> {
        await allure.step('Verify checkout total price', async () => {
            LogHelper.step('Verify checkout total price')
            await this.totalCheckout.textContent().then((text) => {
                expect(text).toContain(actualPrice)
            })
        })
    }

    async verifyCheckoutTaxPrice(actualPrice: string): Promise<void> {
        await allure.step('Verify checkout tax price', async () => {
            LogHelper.step('Verify checkout tax price')
            await this.taxTotal.textContent().then((text) => {
                expect(text).toContain(actualPrice)
            })
        })
    }

    async verifyErrorMessage(expectedMessage: string): Promise<void> {
        await allure.step('Verify error message', async () => {
            LogHelper.step('Verify error message')
            await this.errorMessage.textContent().then((text) => {
                LogHelper.debug(`Error message: ${text}`)
                expect(text).toContain(expectedMessage)
            })
        })
    }
}
