import { test } from '@fixtures/page.fixture'
import * as allure from 'allure-js-commons'
import { expect } from '@playwright/test'
import { readJSON } from '@utils/json.reader'
import { firstName, lastName, postalCode } from '@utils/fake.data'

test.use({ storageState: 'storage/auth.json' })
const negativeDataCheckout = readJSON('data/checkout.negative.json')

/**
 * Checkout feature tests
 */
test.describe('@checkout Checkout Feature', () => {
    test.beforeEach(async ({ page }) => {
        await allure.feature('Checkout Management')
        await page.goto('/inventory.html')
    })

    test('@checkout @smoke should complete checkout process', async ({ inventoryPage, cartPage, checkoutPage }) => {
        await inventoryPage.addProductToCart('Sauce Labs Backpack')
        await cartPage.verifyCountBadge(1)
        await inventoryPage.openCart()

        await checkoutPage.clickCheckoutButton()

        await checkoutPage.checkoutFlow({
            firstName: firstName,
            lastName: lastName,
            postalCode: postalCode
        })

        await checkoutPage.verifyCheckoutSuccess('Thank you for your order!')
    })

    for (const negativedata of negativeDataCheckout as any) {
        test(`@negative @regression ${negativedata.title}`, async ({ inventoryPage, cartPage, checkoutPage }) => {
            await inventoryPage.addProductToCart('Sauce Labs Backpack')
            await cartPage.verifyCountBadge(1)
            await inventoryPage.openCart()

            await checkoutPage.clickCheckoutButton()

            await checkoutPage.checkout({
                firstName: negativedata.firstName,
                lastName: negativedata.lastName,
                postalCode: negativedata.zipCode
            })

            await checkoutPage.verifyErrorMessage(negativedata.expectedError)
        })
    }

    test('@negative @regression Checkout with empty data cart', async ({ inventoryPage, checkoutPage }) => {
        await inventoryPage.openCart()
        expect(await checkoutPage.checkoutButton.isDisabled()).toBeTruthy()
    })

    test('@checkout should cancel checkout process', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await inventoryPage.addProductToCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light'])
        await cartPage.verifyCountBadge(2)

        await inventoryPage.openCart()
        await cartPage.verifyProductExistsInCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light'])

        await checkoutPage.clickCheckoutButton()
        await checkoutPage.checkout({
            firstName: firstName,
            lastName: lastName,
            postalCode: postalCode
        })

        await checkoutPage.cancelCheckout()
        await expect(loginPage.page).toHaveURL(/.*inventory.html/)
    })
})
