import { expect } from '@playwright/test'
import * as allure from 'allure-js-commons'
import ajv from '@utils/schema.validator'

export const validateStatusCode = async (response: any, expectedStatus: number) => {
    await allure.step('Validate response status', async () => {
        expect(response.status()).toBe(expectedStatus)
    })
}

export const validateResponseBody = async (response: any) => {
    return await allure.step('Validate response body', async () => {
        const body = await response.json()
        return body
    })
}

export const validateHeaders = async (response: any, expectedHeaders: Record<string, string>) => {
    await allure.step('Validate response headers', async () => {
        for (const [key, value] of Object.entries(expectedHeaders)) {
            expect(response.headers()[key]).toContain(value)
        }
    })
}

export const validateSchema = async (response: any, schema: any) => {
    await allure.step('Validate response schema', async () => {
        const isSchemaValid = ajv.validate(schema, response)
        expect(isSchemaValid, `Schema validation failed: ${JSON.stringify(ajv.errors, null, 2)}`).toBeTruthy()
    })
}
