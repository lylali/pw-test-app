import { test } from '../test-options';
import { expect } from '@playwright/test'; 


test('input field', async ({page, formLayoutsPage}) => {
    const usingTheGridEmailInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'})
    await usingTheGridEmailInput.fill('test@email.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('anothertest@email.com', {delay: 100})

    await expect(usingTheGridEmailInput).toHaveValue('anothertest@email.com')
})