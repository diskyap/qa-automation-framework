import { test } from '@fixtures/page.fixture'
import * as allure from 'allure-js-commons'
import { readJSON } from '@utils/json.reader'
import { expect } from '@playwright/test'

/**
 * Read test data from JSON files
 */
const positiveData = readJSON('data/login.positive.json')

/**
 * describe block for logout feature
 */
test.describe('@auth @logout Logout Feature', () => {
    test.beforeEach(async ({ page, loginPage }) => {
        await allure.feature('Logout Functionality')
        await page.goto('/')
        await loginPage.login(positiveData[0].username, positiveData[0].password)

        // Assertion to verify successful login
        await expect(loginPage.page).toHaveURL(/.*inventory.html/)
    })

    test('@positive @regression should clear session after successful logout', async ({ loginPage, inventoryPage }) => {
        // metadata for allure report
        await allure.story('Verify successful logout clears session')
        await allure.severity('critical')

        await inventoryPage.logout()

        // Assertion to verify user is redirected to login page after logout
        await expect(loginPage.loginButton).toBeVisible()
    })
})
