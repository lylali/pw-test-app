import { expect } from '@playwright/test';
import { test } from '../test-options';

// drag and drop items inside iframe

test('drag and drop', async ({page, globalSqaURL}) => {
    await page.goto(globalSqaURL)
    await page.getByRole('button', {name: 'Consent'}).click()

    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
    await frame.locator('li', {hasText: 'High Tatras 2'}).dragTo(frame.locator('#trash'))

    // more precise control over the drag and drop: simulate the mouse events
    await frame.locator('li', {hasText: 'High Tatras 4'}).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()

    await expect(frame.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4'])
})