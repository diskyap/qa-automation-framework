import { Page, Locator, expect } from '@playwright/test'
import * as allure from 'allure-js-commons'
import { BasePage } from './base.page'
import { LogHelper } from '@utils/logger'

/**
 * Inventory page class
 */
export class InventoryPage extends BasePage {
    /**
     * Readonly locator variable
     */
    readonly inventoryContainer: Locator
    readonly inventoryItems: Locator
    readonly productNames: Locator
    readonly productPrices: Locator
    readonly sortingDropdown: Locator
    readonly cartIcon: Locator
    readonly burgerMenuButton: Locator
    readonly logoutButton: Locator

    /**
     * Constructor method
     */
    constructor(page: Page) {
        super(page)

        /**
         * Initialize the locator variable
         */
        this.inventoryContainer = page.locator('[data-test="inventory-container"]')
        this.inventoryItems = page.locator('[data-test="inventory-item"]')
        this.productNames = page.locator('[data-test="inventory-item-name"]')
        this.productPrices = page.locator('[data-test="inventory-item-price"]')
        this.sortingDropdown = page.locator('[data-test="product-sort-container"]')
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]')
        this.burgerMenuButton = page.locator('#react-burger-menu-btn')
        this.logoutButton = page.locator('[data-test="logout-sidebar-link"]')
    }

    /**
     * Method to navigate to login page
     */
    async navigateInventory(): Promise<void> {
        await allure.step('Navigate to inventory page', async () => {
            LogHelper.step('Navigating to inventory page')
            await this.navigate('/inventory.html')
        })
    }

    addToCartButton(productName: string): Locator {
        const productSlug = productName.toLowerCase().replace(/\s+/g, '-')
        return this.inventoryItems.filter({ hasText: productName }).locator(`[data-test="add-to-cart-${productSlug}"]`)
    }

    removeButton(productName: string): Locator {
        const productSlug = productName.toLowerCase().replace(/\s+/g, '-')
        return this.inventoryItems.filter({ hasText: productName }).locator(`[data-test="remove-${productSlug}"]`)
    }

    productCard(productName: string): Locator {
        return this.inventoryItems.filter({ hasText: productName })
    }

    /**
     * Action
     */

    // Add support for multiple products
    async addProductToCart(productName: string | string[]): Promise<void> {
        await allure.step(`Add ${productName} to cart`, async () => {
            LogHelper.step(`Add ${productName} to cart`)
            if (Array.isArray(productName)) {
                for (const name of productName) {
                    await this.click(this.addToCartButton(name))
                }
            } else {
                await this.click(this.addToCartButton(productName))
            }
        })
    }

    async removeProductFromCart(productName: string): Promise<void> {
        await allure.step(`Remove ${productName} from cart`, async () => {
            LogHelper.step(`Remove ${productName} from cart`)
            await this.click(this.removeButton(productName))
        })
    }

    async selectSortOption(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        await allure.step(`Select sort option: "${option}"`, async () => {
            LogHelper.step(`Select sort option "${option}"`)
            await this.sortingDropdown.selectOption(option)
        })
    }

    async openCart(): Promise<void> {
        await allure.step('Open cart', async () => {
            LogHelper.step('Open cart')
            await this.click(this.cartIcon)
        })
    }

    async getProductNames(): Promise<string[]> {
        await allure.step('Get product name', async () => {
            LogHelper.step('Get product name')
        })
        return await this.productNames.allTextContents()
    }

    async getProductPrices(): Promise<number[]> {
        await allure.step('Get product price', async () => {
            LogHelper.step('Get product price')
        })
        return await this.productPrices
            .allTextContents()
            .then((prices) => prices.map((price) => parseFloat(price.replace('$', ''))))
    }

    async verifyInventoryLoaded(): Promise<void> {
        await allure.step('Verify inventory loaded', async () => {
            LogHelper.step('Verify inventory loaded')
            await expect(this.inventoryContainer).toBeVisible()
        })
    }

    async verifyProductVisible(productName: string): Promise<void> {
        await allure.step(`Verify ${productName} is visible`, async () => {
            LogHelper.step(`Verify ${productName} is visible`)
            await expect(this.productCard(productName)).toBeVisible()
        })
    }

    async verifyProductAddedToCart(productName: string): Promise<void> {
        await allure.step(`Verify ${productName} is added to cart`, async () => {
            LogHelper.step(`Verify ${productName} is added to cart`)
            await expect(this.removeButton(productName)).toBeVisible()
        })
    }

    async verifyProductRemovedFromCart(productName: string): Promise<void> {
        await allure.step(`Verify ${productName} is removed from cart`, async () => {
            LogHelper.step(`Verify ${productName} is removed from cart`)
            await expect(this.addToCartButton(productName)).toBeVisible()
        })
    }

    async verifySortHighToLow(): Promise<void> {
        await allure.step('Verify sort high to low', async () => {
            LogHelper.step('Verify sort high to low')
            const actualPrices = await this.getProductPrices()
            const expectedPrices = [...actualPrices].sort((a, b) => b - a)
            expect(actualPrices).toEqual(expectedPrices)
        })
    }

    async verifySortLowToHigh(): Promise<void> {
        await allure.step('Verify sort low to high', async () => {
            LogHelper.step('Verify sort low to high')
            const actualPrices = await this.getProductPrices()
            const expectedPrices = [...actualPrices].sort((a, b) => a - b)
            expect(actualPrices).toEqual(expectedPrices)
        })
    }

    async verifySortNameZA(): Promise<void> {
        await allure.step('Verify sort name Z-A', async () => {
            LogHelper.step('Verify sort name Z-A')
            const actualNames = await this.getProductNames()
            const expectedNames = [...actualNames].sort().reverse()
            expect(actualNames).toEqual(expectedNames)
        })
    }

    async clickBurgerMenuButton(): Promise<void> {
        await allure.step('Click on burger menu button', async () => {
            LogHelper.step('Click on burger menu button')
            const menu = await this.burgerMenuButton
            await this.click(menu)
        })
    }

    async clickLogoutButton(): Promise<void> {
        await allure.step('Click on logout button', async () => {
            LogHelper.step('Click on logout button')
            await this.click(this.logoutButton)
        })
    }

    async logout(): Promise<void> {
        await allure.step('Perform logout flow', async () => {
            await this.clickBurgerMenuButton()
            await this.clickLogoutButton()
        })
    }

    //   /**
    //    * Click on burger menu button
    //    */
    //   async clickBurgerMenuButton(): Promise<void> {
    //     await allure.step('Click on burger menu button', async () => {
    //       LogHelper.step('Click on burger menu button')
    //       await this.click(this.burgerMenuButton)
    //     })
    //   }

    //   /**
    //    * Click on shopping cart link
    //    */
    //   async clickShoppingCartLink(): Promise<void> {
    //     await allure.step('Click on shopping cart link', async () => {
    //       LogHelper.step('Click on shopping cart link')
    //       await this.click(this.shoppingCartLink)
    //     })
    //   }

    //   /**
    //    * Get inventory item price based on index
    //    * @param index - index of the inventory item
    //    * @returns price of the inventory item
    //    */
    //   async getInventoryItemPrice(index: number): Promise<string> {
    //     LogHelper.step(`Get inventory item price`)
    //     const price = await this.getText(this.inventoryItemPrice.nth(index))
    //     return price
    //   }

    //   /**
    //    * Get highest price item
    //    * @returns highest price item
    //    */
    //   async getHighestPriceItem(): Promise<string> {
    //     const productsPrice: string[] = []

    //     await allure.step('Get highest price item', async () => {
    //       const qtyProductsToAdd = await this.getInventoryItemsCount()

    //       for (let i = 0; i < qtyProductsToAdd; i++) {
    //         const itemDetails = await this.getInventoryItemDetails(i)
    //         productsPrice.push(itemDetails.price)
    //       }

    //       productsPrice.sort((a, b) => parseFloat(b) - parseFloat(a))
    //       LogHelper.step(`Get highest price from items: ${productsPrice}`)
    //     })
    //     return productsPrice[0]
    //   }

    //   /**
    //    * Get lowest price item
    //    * @returns lowest price item
    //    */
    //   async getLowestPriceItem(): Promise<string> {
    //     const productsPrice: string[] = []

    //     await allure.step('Get lowest price item', async () => {
    //       const qtyProductsToAdd = await this.getInventoryItemsCount()

    //       for (let i = 0; i < qtyProductsToAdd; i++) {
    //         const itemDetails = await this.getInventoryItemDetails(i)
    //         productsPrice.push(itemDetails.price)
    //       }

    //       productsPrice.sort((a, b) => parseFloat(a) - parseFloat(b))
    //       LogHelper.step(`Get lowest price from items: ${productsPrice}`)
    //     })
    //     return productsPrice[0]
    //   }

    //   /**
    //    * Get inventory item details based on index
    //    * @param index - index of the inventory item
    //    * @returns inventory item details
    //    */
    //   async getInventoryItemDetails(index: number): Promise<{ name: string, description: string, price: string }> {
    //     const name = await this.getText(this.inventoryItemsName.nth(index))
    //     const description = await this.getText(this.inventoryItemDesc.nth(index))
    //     const price = await this.getText(this.inventoryItemPrice.nth(index))
    //     return { name, description, price }
    //   }

    //   /**
    //    * Get inventory items count
    //    * @returns number of inventory items
    //    */
    //   async getInventoryItemsCount(): Promise<number> {
    //     return await this.inventoryItems.count()
    //   }

    //   /**
    //    * Get add to cart locator based on product name
    //    * @param productName - name of the product
    //    * @returns locator for add to cart button
    //    */

    //   private getRemoveFromCartLocator(productName: string): Locator {
    //     const productSlug = productName.toLowerCase().replace(/\s+/g, '-')

    //     // return locator for remove from cart button based on product name
    //     return this.page.locator(`[data-test="remove-${productSlug}"]`)
    //   }

    //   /**
    //    * Add product to cart based on product name
    //    * @param productName - name of the product to add to cart
    //    */
    //   async addProductToCart(productName: string): Promise<void> {
    //     await allure.step(`Add product to cart: "${productName}"`, async () => {
    //       LogHelper.step(`Add product "${productName}" to cart`)

    //       const addToCartButton = this.getAddToCartLocator(productName)

    //       await this.click(addToCartButton)
    //     })
    //   }

    //   /**
    //      * Add multiple products to cart
    //      * @param productNames - array of product names to add to cart
    //      */
    //   async addToCartMultiple(productNames: string[]): Promise<void> {
    //     await allure.step(`Add multiple products to cart`, async () => {
    //       LogHelper.step(`Add multiple products to cart: ${productNames.join(', ')}`)

    //       const productsName: string[] = []

    //       const qtyProductsToAdd = await this.inventoryItems.count()

    //       for (let i = 0; i < qtyProductsToAdd; i++) {
    //         const itemDetails = await this.getInventoryItemDetails(i)
    //         productsName.push(itemDetails.name)
    //       }

    //       for (const product of productsName) {
    //         await this.addProductToCart(product)
    //       }
    //     })
    //   }

    //   /**
    //    * Remove product from cart based on product name
    //    * @param productName - name of the product to remove from cart
    //    */
    //   async removeProductFromCart(productName: string): Promise<void> {
    //     await allure.step(`Remove product from cart: "${productName}"`, async () => {
    //       LogHelper.step(`Remove product "${productName}" from cart`)

    //       const removeFromCartButton = this.getRemoveFromCartLocator(productName)
    //       await this.click(removeFromCartButton)
    //     })
    //   }

    //   /**
    //    * Get all products from inventory page
    //    * @returns array of product names
    //    */
    //   async getAllListingProducts(): Promise<string[]> {
    //     const productsName: string[] = []
    //     const qtyProductsToAdd = await this.getInventoryItemsCount()

    //     for (let i = 0; i < qtyProductsToAdd; i++) {
    //       const itemDetails = await this.getInventoryItemDetails(i)
    //       productsName.push(itemDetails.name)
    //     }

    //     return productsName
    //   }

    //   /**
    //    * Select sort option
    //    * @param option - sort option to select
    //    */
    //   async selectSortOption(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    //     await allure.step(`Select sort option: "${option}"`, async () => {
    //       LogHelper.step(`Select sort option "${option}"`)
    //       await this.productSortContainer.selectOption(option)
    //     })
    //   }

    //   /**
    //   * Click on logout button
    //   */
    //   async clickLogoutButton(): Promise<void> {
    //     await allure.step('Click on logout button', async () => {
    //       LogHelper.step('Click on logout button')
    //       await this.click(this.logoutButton)
    //     })
    //   }

    //   /**
    //    * Perform logout flow
    //    */
}
