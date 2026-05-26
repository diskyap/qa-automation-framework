import { test } from '@fixtures/page.fixture'
import * as allure from 'allure-js-commons'
import { readJSON } from '@utils/json.reader'
import { expect } from '@playwright/test'

/**
 * Read test data from JSON files
 */
const positiveData = readJSON('data/login.positive.json')
const negativeData = readJSON('data/login.negative.json')

/**
 * describe block for login feature
 */
test.describe('@auth @login Login Feature', () => {
    test.beforeEach(async ({ loginPage }) => {
        await allure.feature('Login Functionality')
        await loginPage.navigate('/')
    })

    /**
     * Iterate through positive test data and create test cases
     */
    for (const positivedata of positiveData as any) {
        test(`@positive @smoke ${positivedata.title}`, async ({ loginPage }) => {
            // metadata for allure report
            await allure.story('Successful login with valid credentials')
            await allure.severity('critical')

            await allure.step(`login with username: ${positivedata.username}`, async () => {
                await loginPage.login(positivedata.username, positivedata.password)

                // assertion to verify successful login
                await expect(loginPage.page).toHaveURL(/.*inventory.html/)
                await loginPage.saveStorageState('storage/auth.json')
            })
        })
    }

    /**
     * Iterate through negative test data and create test cases
     */
    for (const negativedata of negativeData as any) {
        test(`@negative @regression ${negativedata.title}`, async ({ loginPage }) => {
            // metadata for allure report
            await allure.story('Failed login with invalid credentials')
            await allure.severity('critical')

            await allure.step(
                `login with username: ${negativedata.username} and password: ${negativedata.password}`,
                async () => {
                    await loginPage.login(negativedata.username, negativedata.password)

                    // assertion to verify error message is displayed
                    await expect(loginPage.errorMessage).toHaveText(negativedata.expectedError)
                    await expect(loginPage.errorMessage).toBeVisible()
                }
            )
        })
    }
})
