import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'

const environment = process.env.ENV || 'env.qa'
const envFilePath = path.resolve(__dirname, `.env.${environment}`)

dotenv.config({ path: envFilePath, quiet: true })

export default defineConfig({
    testDir: './tests',

    timeout: 30000,

    expect: {
        timeout: 15000
    },

    fullyParallel: true,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 3 : 0,

    workers: process.env.CI ? 5 : undefined,

    reporter: [
        ['list'],
        // ['html', { open: 'never' }],
        [
            'allure-playwright',
            {
                environmentInfo: {
                    Epic: 'E-Commerce Core Feature',
                    'Parent Suite': 'UI Automation Suite',
                    Environment: 'Production'
                }
            }
        ]
    ],

    use: {
        // Base URL
        baseURL: process.env.BASE_URL,

        // Screenshot only when failed
        screenshot: 'only-on-failure',

        // Video only when failed
        video: 'retain-on-failure',

        // Trace only when failed + retry
        trace: 'retain-on-failure',

        // Browser viewport
        // viewport: {
        //   width: 1280,
        //   height: 720
        // },

        // Ignore HTTPS errors
        ignoreHTTPSErrors: true,

        // Headless mode
        headless: true
    },

    projects: [
        // {
        //     name: 'setup',

        //     testMatch: /auth\.setup\.ts/
        // },
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
                // storageState: 'storage/auth.json'
            }
            // dependencies: ['setup']
        }
        // {
        //   name: 'firefox',
        //   use: {
        //     ...devices['Desktop Firefox']
        //   }
        // },

        // {
        //   name: 'webkit',
        //   use: {
        //     ...devices['Desktop Safari']
        //   }
        // }
    ]

    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://localhost:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
})
