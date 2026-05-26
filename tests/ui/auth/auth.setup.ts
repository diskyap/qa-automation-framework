import { test } from '@fixtures/page.fixture'

test('authenticate', async ({ loginPage }) => {
    await loginPage.navigate('/')
    await loginPage.login('standard_user', 'secret_sauce')
    await loginPage.saveStorageState('storage/auth.json')
})
