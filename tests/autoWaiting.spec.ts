import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
})

// set timeout for all the test suites: set it in beforeEach hook
test.beforeEach(async ({page}, testInfo) => {
    testInfo.setTimeout(testInfo.timeout + 2000)
})


test('auto waiting', async({page}) => {
    const successButton  = page.locator('.bg-success')
    // await successButton.click()

    // allTextContent doesn't have auto waiting
    const text = await successButton.allTextContents()
    // expect(text).toContain('Data loaded with AJAX get request.')
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout:20000})

})

test('alternative waits', async({page}) => {
    const successButton = page.locator('.bg-locator')

    // wait for element
    await page.waitForSelector('.bg-success')

    // wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // wait for network calls to be completed : not recommended
    await page.waitForLoadState('networkidle')

    // hard code timeout
    await page.waitForTimeout(5000)

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')    
})



// TIMEOUT
test('timeout', async ({page}) => {
    // use slow method for longer execution time
    test.slow()
    const successButton = page.locator('.bg-locator')
})


