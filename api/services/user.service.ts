import { APIRequestContext } from '@playwright/test'
import { BaseClient } from '../clients/base.client'
import { UserEndpoint } from '../endpoint/user.endpoint'
import { LogHelper } from '@utils/logger'

export class UserService extends BaseClient {
    private endpoint: UserEndpoint

    constructor(request: APIRequestContext) {
        super(request)
        this.endpoint = new UserEndpoint()
    }

    async getUsers() {
        LogHelper.step('Hit get users endpoint')
        LogHelper.debug(`Endpoint: ${this.endpoint.users}`)
        return await this.get(this.endpoint.users)
    }

    async getUserById(id: number) {
        LogHelper.step('Hit get user by id endpoint')
        LogHelper.debug(`Endpoint: ${this.endpoint.userId.replace('{id}', id.toString())}`)
        return await this.get(this.endpoint.userId.replace('{id}', id.toString()))
    }
}
