import { UserService } from '@api/services/user.service'
import { expect, test } from '@playwright/test'
import { usersSchema, userSchemaID } from '@api/schemas/user.schema'
import {
    validateStatusCode,
    validateHeaders,
    validateResponseBody,
    validateSchema
} from '@api/validators/user.validator'
import * as allure from 'allure-js-commons'

test.describe('User API Tests', () => {
    let userService: UserService

    test.beforeEach(async ({ request }) => {
        userService = new UserService(request)
    })

    test('@positive should get all users', async () => {
        await allure.step('Get all users', async () => {
            const response = await userService.getUsers()

            await validateHeaders(response, {
                'content-type': 'application/json'
            })
            await validateStatusCode(response, 200)

            const body = await validateResponseBody(response)

            await validateSchema(body, usersSchema)

            expect(body).toBeInstanceOf(Array)
            expect(body.length).toBeGreaterThan(0)
        })
    })

    test('@positive should get user by id', async () => {
        await allure.step('Get user by id', async () => {
            const response = await userService.getUserById(1)

            await validateHeaders(response, {
                'content-type': 'application/json'
            })
            await validateStatusCode(response, 200)

            const body = await validateResponseBody(response)

            await validateSchema(body, userSchemaID)

            expect(body.id).toBe(1)
            expect(body.email).toContain('@')
        })
    })

    test('@negative should get user byId is not found', async () => {
        await allure.step('Get user by id', async () => {
            const response = await userService.getUserById(999)

            await validateHeaders(response, {
                'content-type': 'application/json'
            })
            await validateStatusCode(response, 404)

            const body = await validateResponseBody(response)

            expect(body).toEqual({})
        })
    })
})
