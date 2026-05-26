import { test } from '@fixtures/page.fixture'
import * as allure from 'allure-js-commons'
import { expect } from '@playwright/test'

test.use({ storageState: 'storage/auth.json' })

/**
 * Inventory feature tests
 */
test.describe('@inventory Inventory Feature', () => {
    test.beforeEach(async ({ page }) => {
        await allure.feature('Inventory Management')
        await page.goto('/inventory.html')
    })

    test('@positive @smoke should display inventory items', async ({ inventoryPage }) => {
        // metadata for allure report
        await allure.story('Products are displayed in inventory page')
        await allure.severity('critical')

        await allure.step('should see inventory list', async () => {
            await inventoryPage.verifyInventoryLoaded()
        })
    })

    test('@positive @smoke should add product to cart', async ({ inventoryPage }) => {
        // metadata for allure report
        await allure.story('Add product to shopping cart from inventory page')
        await allure.severity('critical')

        await allure.step('Add product to cart', async () => {
            await inventoryPage.addProductToCart('Sauce Labs Backpack')

            // assertion to verify product is added to cart
            expect(inventoryPage.verifyProductAddedToCart('Sauce Labs Backpack'))
        })
    })
})
