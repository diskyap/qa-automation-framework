import { APIRequestContext } from '@playwright/test'
import dotenv from 'dotenv'
import { LogHelper } from '@utils/logger'

dotenv.config()

export class BaseClient {
    protected request: APIRequestContext
    protected baseUrl: string

    constructor(request: APIRequestContext) {
        this.request = request
        this.baseUrl = 'https://jsonplaceholder.typicode.com'

        if (!this.baseUrl) {
            throw new Error('BASE_URL is not defined in .env')
        }
    }

    /**
     * Standard headers
     */
    protected defaultHeaders(): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }

    async _sendRequest(method: string, endpoint: string, options: any = {}) {
        const url = `${this.baseUrl}${endpoint}`

        try {
            const response = await this.request.fetch(url, {
                method,
                headers: {
                    ...this.defaultHeaders(),
                    ...options.headers
                },
                ...options
            })
            LogHelper.step(`API request completed: ${method} ${url}`)
            LogHelper.debug(`Response: ${JSON.stringify(await response.json())}`)
            return response
        } catch (error) {
            LogHelper.error(`API request failed: ${error}`)
            throw error
        }
    }

    async get(endpoint: string, options: any = {}) {
        return await this._sendRequest('GET', endpoint, options)
    }

    async post(endpoint: string, options: any = {}) {
        return await this._sendRequest('POST', endpoint, options)
    }

    async put(endpoint: string, options: any = {}) {
        return await this._sendRequest('PUT', endpoint, options)
    }

    async delete(endpoint: string, options: any = {}) {
        return await this._sendRequest('DELETE', endpoint, options)
    }
}
