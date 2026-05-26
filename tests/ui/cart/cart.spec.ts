import { test } from '@fixtures/page.fixture'
import * as allure from 'allure-js-commons'
import { expect } from '@playwright/test'

test.use({ storageState: 'storage/auth.json' })

/**
 * Cart feature tests
 */
test.describe('@cart Cart Feature', () => {
    test.beforeEach(async ({ page }) => {
        await allure.feature('Cart Management')
        await page.goto('/inventory.html')
    })

    test('should add product to cart', async ({ cartPage }) => {
        await allure.story('Add Product to Cart')
        await allure.severity('normal')

        await allure.step('Add product to cart and verify count', async () => {
            await cartPage.addProductToCart('Sauce Labs Backpack')

            await cartPage.verifyCountBadge(1)
        })
    })

    test('should remove product from cart', async ({ cartPage }) => {
        await allure.story('Remove Product from Cart')
        await allure.severity('normal')

        await allure.step('Add product to cart and remove it', async () => {
            await cartPage.addProductToCart('Sauce Labs Backpack')

            await cartPage.removeProductFromCart('Sauce Labs Backpack')
            await expect(cartPage.cartBadge).not.toBeVisible()
        })
    })

    test('should add multiple products to cart', async ({ cartPage }) => {
        await allure.story('Add Multiple Products to Cart')
        await allure.severity('normal')

        await allure.step('Add multiple products to cart and verify count', async () => {
            await cartPage.addProductToCart('Sauce Labs Backpack')
            await cartPage.addProductToCart('Sauce Labs Bike Light')
            await cartPage.addProductToCart('Sauce Labs Bolt T-Shirt')

            await cartPage.verifyCountBadge(3)
        })
    })
})
