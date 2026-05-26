import { Page, Locator } from '@playwright/test'
import { LogHelper } from '@utils/logger'

/**
 * Base page class
 */
export class BasePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async navigate(url: string): Promise<void> {
        LogHelper.step(`Navigating to URL: ${url}`)
        await this.page.goto(url)
    }

    async click(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' })
        await locator.click()
    }

    async fill(locator: Locator, text: string): Promise<void> {
        await locator.waitFor({ state: 'visible' })
        await locator.fill(text)
    }

    async getText(locator: Locator): Promise<string> {
        const text = await locator.textContent()
        return text?.trim() || ''
    }

    async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible()
    }

    async saveStorageState(filePath: string = 'auth.json') {
        LogHelper.step(`Saving storage state to: ${filePath}`)
        await this.page.context().storageState({ path: filePath })
    }
}
