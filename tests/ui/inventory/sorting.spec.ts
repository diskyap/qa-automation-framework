import { test } from '@fixtures/page.fixture'
import * as allure from 'allure-js-commons'

test.use({ storageState: 'storage/auth.json' })

// describe block for sorting feature
test.describe('@inventory @shorting Inventory Feature', () => {
    test.beforeEach(async ({ page }) => {
        await allure.feature('Inventory Management')
        await page.goto('/inventory.html')
    })

    test('@positive should sort products by (Low to High) price @sort', async ({ inventoryPage }) => {
        // metadata for allure report
        await allure.story('Sort products by price (low to high)')
        await allure.severity('critical')

        await allure.step('Verify inventory items are displayed', async () => {
            await inventoryPage.selectSortOption('lohi')

            await inventoryPage.verifySortLowToHigh()
        })
    })

    test('@positive should sort products by (High to Low) price @sort', async ({ inventoryPage }) => {
        // metadata for allure report
        await allure.story('Sort products by price (high to low)')
        await allure.severity('critical')

        await allure.step('Verify inventory items are displayed', async () => {
            await inventoryPage.selectSortOption('hilo')

            await inventoryPage.verifySortHighToLow()
        })
    })

    test('@positive should sort products by (Z-A) name @sort', async ({ inventoryPage }) => {
        // metadata for allure report
        await allure.story('Sort products by name (Z-A)')
        await allure.severity('critical')

        await allure.step('Verify inventory items are displayed', async () => {
            await inventoryPage.selectSortOption('za')

            await inventoryPage.verifySortNameZA()
        })
    })
})
