import { test } from '@fixtures/page.fixture'
import * as allure from 'allure-js-commons'
import { readJSON } from '@utils/json.reader'
import { expect } from '@playwright/test'
import { firstName, lastName, postalCode } from '@utils/fake.data'

/**
 * Read test data from JSON files
 */
const positiveData = readJSON('data/login.positive.json')

/**
 * describe block for login feature
 */

test.describe.configure({ mode: 'serial' })

test.describe('@e2e E2E Flow', () => {
    test.beforeEach(async ({ loginPage }) => {
        await allure.feature('E2E Flow')
        await loginPage.navigate('/')
    })

    /**
     * Iterate through positive test data and create test cases
     */
    for (const positivedata of positiveData as any) {
        test('@positive @e2e can completed purchase flow successfully', async ({
            loginPage,
            inventoryPage,
            cartPage,
            checkoutPage
        }) => {
            // metadata for allure report
            await allure.story('E2E Flow')
            await allure.severity('critical')

            await allure.step(`login with username: ${positivedata.username}`, async () => {
                await loginPage.login(positivedata.username, positivedata.password)
                await expect(loginPage.page).toHaveURL(/.*inventory.html/)
            })

            await allure.step('verify inventory page loaded and sorted (Low to High)', async () => {
                await inventoryPage.verifyInventoryLoaded()
                await inventoryPage.selectSortOption('lohi')
                await inventoryPage.verifySortLowToHigh()
            })

            await allure.step('add product to cart', async () => {
                const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt']

                await inventoryPage.addProductToCart(products)
                await cartPage.verifyCountBadge(products.length)

                await cartPage.openCart()
                await cartPage.verifyProductExistsInCart(products)
            })

            await allure.step('proceed to checkout', async () => {
                await checkoutPage.clickCheckoutButton()

                await checkoutPage.checkout({
                    firstName: firstName,
                    lastName: lastName,
                    postalCode: postalCode
                })

                const itemTotal = await checkoutPage.getItemTotal()
                const subtotal = await checkoutPage.getCheckoutTotalPrice()

                expect(itemTotal).toBe('55.97')
                expect(subtotal).toBe('60.45')
            })

            await allure.step('complete checkout', async () => {
                await checkoutPage.finishCheckout()
                await checkoutPage.verifyCheckoutSuccess('Thank you for your order!')
            })
        })
    }
})
