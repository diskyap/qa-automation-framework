import test, { Page, Locator, expect } from '@playwright/test'
import * as allure from 'allure-js-commons'
import { BasePage } from './base.page'
import { LogHelper } from '@utils/logger'

/**
 * Cart page class to handle elements and actions on the shopping cart page
 */
export class CartPage extends BasePage {
    /**
     * Readonly locator variables
     */
    readonly cartIcon: Locator
    readonly cartBadge: Locator
    readonly cartItems: Locator
    readonly inventoryItems: Locator
    readonly removeButton: Locator

    /**
     * Constructor method
     */
    constructor(page: Page) {
        super(page)

        /**
         * Initialize the locator variables
         */
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]')
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')
        this.cartItems = page.locator('[data-test="inventory-item"]')
        this.inventoryItems = page.locator('[data-test="inventory-item"]')
        this.removeButton = page.locator('[data-test="remove-test.allthethings-Shirt-Red"]')
    }

    /**
     * Action
     */
    private getProductToCartButton(productName: string): Locator {
        const productSlug = productName.toLowerCase().replace(/\s+/g, '-')

        // return locator for add to cart button based on product name
        return this.page.locator(`[data-test="add-to-cart-${productSlug}"]`)
    }

    private getProductToRemove(productName: string): Locator {
        const productSlug = productName.toLowerCase().replace(/\s+/g, '-')

        // return locator for add to cart button based on product name
        return this.page.locator(`[data-test="remove-${productSlug}"]`)
    }

    // add product to cart
    async addProductToCart(productName: string): Promise<void> {
        await allure.step('Add product to cart', async () => {
            LogHelper.step(`Add product to cart: ${productName}`)

            const addToCartButton = this.getProductToCartButton(productName)
            await this.click(addToCartButton)
        })
    }

    // remove product from cart
    async removeProductFromCart(productName: string): Promise<void> {
        await allure.step('Remove product from cart', async () => {
            LogHelper.step(`Remove product from cart: ${productName}`)

            const removeProductButton = this.getProductToRemove(productName)
            await this.click(removeProductButton)
        })
    }

    // open cart
    async openCart(): Promise<void> {
        await allure.step('Open cart', async () => {
            LogHelper.step('Open Shopping cart')

            await this.click(this.cartIcon)
        })
    }

    /**
     * Assertion
     */
    async verifyCountBadge(expectedCount: number): Promise<void> {
        await allure.step('Verify count badge', async () => {
            LogHelper.step(`Verify count badge: ${expectedCount}`)

            const actualCount = await this.cartBadge.textContent()
            expect(actualCount).toBe(expectedCount.toString())
        })
    }

    // verify product exists in cart (supports single or multiple products)
    async verifyProductExistsInCart(productName: string | string[]): Promise<void> {
        await allure.step('Verify product exists in cart', async () => {
            const productList = Array.isArray(productName) ? productName : [productName]
            LogHelper.step(`Verify product exists in cart: ${productList.join(', ')}`)

            for (const product of productList) {
                const productLocator = this.cartItems.filter({
                    hasText: product
                })
                await expect(productLocator).toBeVisible()
            }
        })
    }

    // verify cart item count
    async verifyCartItemCount(expectedCount: number): Promise<void> {
        await allure.step('Verify cart item count', async () => {
            LogHelper.step(`Verify cart item count: ${expectedCount}`)

            const actualCount = await this.cartItems.count()
            expect(actualCount).toBe(expectedCount)
        })
    }
}
