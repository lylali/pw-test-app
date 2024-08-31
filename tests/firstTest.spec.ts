import { Conditional } from '@angular/compiler';
import {test, expect} from '@playwright/test';
import { BADFAMILY } from 'dns';


// before hook
test.beforeEach(async ({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

// // another hook : a gneral pre-condition befor the excution of the tests, eg to look into the database
// test.beforeAll(() => {
//     console.log('before tests start')
// })


// // test('navigate to Form Layouts', async ({page}) => {
// //     await page.getByText('Form Layouts').click()
// // })



// // test suite
// test.describe('test suite 1', () => {
//     test.beforeEach(async ({page}) => {
//         await page.getByText('Forms').click()
//     })

//     test('navigate to the Form Layouts', async ({page}) => {
//         await page.getByText('Form Layouts').click()
//     })

//     test('navigate to Datepicker', async ({page}) => {
//         await page.getByText('Datepicker').click()
//     })
// })

// // to skip a test suite
// test.describe.skip('test suite 2', () => {
//     test('test two', async ({page}) => {
//         console.log('test two')
//     })
// })


// // to only run a specific test suite
// // test.describe.only('test suite 3', () => {
// //     test('test three', async ({page}) => {
// //         console.log('test three')
// //     })
// // })



// // after hook
// test.afterEach(async ({page}) => {
//     console.log('after each test')
// })


// find an element 
test('Locator test', async ({page}) => {
    // by tag name
    await page.locator('input').first().click()

    // by id
    page.locator('#inputEmail1')

    // by class name
    page.locator('.shape-rectangle')
    
    // by attribute
    page.locator('[placeholder="Email"]')

    // by full class name
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // combine diff selectors
    page.locator('inpuyt[ploaceholder="Email"][type="email"]') 

    // by xpath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    // by partial text
    page.locator(':text("the Grid")')
    
    // by exact test
    page.locator('test-is("Using the Grid")')
})


// user facing locators
test('user facing locators', async ({page}) => {
    await page.getByRole('textbox', {name: 'Email'}).first().click()
    await page.getByRole('button', {name: 'Sign In'}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').first().click()

    await page.getByText('Using the Grid').click()
    
    // await page.getByTitle('IoT Dashboard').click()

    await page.getByTestId('SignIn').click()
})



// CHILD ELEMENTS
test('locating child elements', async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    // or
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    // combine with other selectors : avoid using first() as the sequence of elements may change
    await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click()

    // using the index of elements : avoid using index approach
    await page.locator('nb-card').nth(3).getByRole('button').click()

})


// PARENT ELEMENTS
test('locating parent elements', async ({page}) => {
    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name:'Email'}).click()

    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name:'Password'}).click()

    // using filter
    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', {name:'Email'}).click()

    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: 'Password'}).click()

    // combine multiple filters
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'}).getByRole('textbox', {name: 'Email'}).click()

    // using xpath : not recommended
    // .. will go to the parent element
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: 'Email'}).click()
})


// reusing locators
test('before reusing locators', async ({page}) => {
    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', {name: 'Email'}).fill('test@email.com')
    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', {name: 'Password'}).fill('demopassword')
    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('button').click()
})

test('after reusing locators', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})
    
    await emailField.fill('test@email.com')
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('demopassword')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@email.com')
})


// extracting values
test('extracting values', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
    const buttonText = await basicForm.getByRole('button').textContent()
    expect(buttonText).toEqual('Submit')

    // extract all text content
    const radioButtonLabels = await page.locator('nb-radio').allTextContents()
    expect(radioButtonLabels).toContain('Option 1')

    // extract input values
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})
    await emailField.fill('test@email.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@email.com')

    // extract attribute values
    const placeHolderValue = await emailField.getAttribute('placeholder')
    expect(placeHolderValue).toEqual('Email')
})


// asserations
test('assertions', async ({page}) => {
    // general assertions
    const value = 5
    expect(value).toEqual(5)

    const basicFormButton = page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('button')
    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    // locator assertions
    await expect(basicFormButton).toHaveText('Submit')

    // soft assertions
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
})



// AUTO WIATING
test('auto waiting', async ({page}) => {
    
})



