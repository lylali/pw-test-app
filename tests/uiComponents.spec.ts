import {test, expect} from '@playwright/test'
import { tooltip } from 'leaflet'
import { __awaiter } from 'tslib'

test.beforeEach(async ({page}) => {
    await page.goto('/')
})

test.describe.only('Form Layouts Page', () => {
    // overwrite the retry setting set in the playwright.config.ts
    test.describe.configure({retries: 0})

    test.beforeEach( async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input field', async ({page}, testInfo) => {
        // do something before the retry, such as clearing datebase
        if (testInfo.retry){
            // clear the database
        }

        const usingTheGridEmailInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'})
        
        await usingTheGridEmailInput.fill('test@email.com')

        // clear the input
        await usingTheGridEmailInput.clear()

        // fill out the input by simulating the ket strokes
        // using delay method to delay between key strokes
        await usingTheGridEmailInput.pressSequentially('anothertest@email.com', {delay: 100})

        // generic assertions
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('anothertest@email.com')

        // locator assertions
        await expect(usingTheGridEmailInput).toHaveValue('anothertest@email.com')
    })


    test.only('radio button', async ({page}) => {
        const usingTheGrid = page.locator('nb-card', {hasText: 'Using the Grid'})
        const radioButton = usingTheGrid.getByRole('radio', {name: 'Option 2'})

        // use parameter force to check the radio button which has a class of visually hidden
        await radioButton.check({force: true})

        // // generic assertions
        // expect(await radioButton.isChecked()).toBeTruthy()

        // // locator assertions
        // await expect(radioButton).toBeChecked()

        // use visual assertions
        
        await expect(usingTheGrid).toHaveScreenshot()
        
    })

})


test.describe('Toastr Page', () => {
    test.beforeEach( async ({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()
    })

    test('checkboxes', async({page}) => {
        // diffence between click and check methods: check method will have the checkbox checked even it's already checked, click method only performs the clickd action
        await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true})
        await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true})


        // to check or uncheck all the boxes
        const allBoxes = page.getByRole('checkbox') 
        for (const box of await allBoxes.all()){
            await box.check({force: true})
            expect(await box.isChecked()).toBeTruthy()
        }
    })
 })


 test('list and dropdowns', async ({page}) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list') // when the list has an UL tag
    page.getByRole('listbox') // when the list has a LI tag
    
    // const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
    await optionList.filter({hasText: 'Cosmic'}).click()
    
    // verify the change of the background color
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    // verify all the colors
    const colors = {
        'Light': 'rgb(255, 255, 255)',
        'Dark': 'rgb(34, 43, 69)',
        'Cosmic': 'rgb(50, 50, 89)',
        'Corporate': 'rgb(255, 255, 255)'
    }

    await dropDownMenu.click()
    for(const color in colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if(color !== 'Corporate'){
            await dropDownMenu.click()
        }
    }
})


test('tooltip', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()
    
    const toolTipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await toolTipCard.getByRole('button', {name: 'Top'}).hover()

    const toolTipText = await page.locator('nb-tooltip').textContent()
    expect(toolTipText).toEqual('This is a tooltip')
})


test('dialogue box', async ({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // interact with the browser dialog
    // create a listener to listen to the dialog event
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})


test('update web table', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // 1. get the target row 
    const targetRow = page.getByRole('row', {name: 'twitter@outlook.com'})
    await targetRow.locator('.nb-edit').click()

    // 2. get the target cell
    // once the edit button is clicked, the cell will display the property valu instead of html value
    const ageToBeChanged = page.locator('input-editor').getByPlaceholder('Age')
    // clear the value in the cell
    await ageToBeChanged.clear()
    // fill in with new value
    await ageToBeChanged.fill('35')

    // 3. save the change and verify the change
    await page.locator('.nb-checkmark').click()
    await expect(targetRow.locator('td', {hasText: '35'})).toBeVisible()

})


test('update web table by ID', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // navigation on pagination
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()

    // filter out the first column which is the ID column
    const targetRow = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')})

    // edit the row and verify the change
    await targetRow.locator('.nb-edit').click()
    const emailToBeChanged = page.locator('input-editor').getByPlaceholder('E-mail')
    await emailToBeChanged.clear()
    await emailToBeChanged.fill('test@demo.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRow.locator('td', {hasText: 'test@demo.com'})).toBeVisible()
    
})


test('filter out the table', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    const agesToBeFiltered = ['20', '30', '40', '200']

    for (let age of agesToBeFiltered){
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)

        await page.waitForTimeout(500)
        
        const filteredRows = page.locator('tbody tr')

        if (age === '200'){
            expect(page.locator('td')).toContainText('No data found')
        } else {
            for (let row of await filteredRows.all()){
                const ageValue = await row.locator('td').last().textContent()
                expect(ageValue).toBe(age)
            }
        }
    }
})


test('date picker', async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInput = page.getByPlaceholder('Form Picker')
    await calendarInput.click()

    // 1. hard code the date picking 
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('30', {exact:true}).click() // getBYText is partial match, add {exact:true} to make it exact match
    await expect(calendarInput).toHaveValue('Aug 30, 2024')

    // 2. auto pick the date of tomorrow (this approach would apply if the chosen date is in next month)
    let date = new Date()
    date.setDate(date.getDate() + 1)
    const expectedDate = date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})
    await calendarInput.click()
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(date.getDate().toString(), {exact:true}).click()
    await expect(calendarInput).toHaveValue(expectedDate)


    // 3. auto choose the target month and date
    let newdate = new Date()
    newdate.setDate(newdate.getDate() + 30)
    await calendarInput.click()

    let currentMonthYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthYear = `${newdate.toLocaleString('en-US', {month: 'long'})} ${newdate.toLocaleString('en-US', {year: 'numeric'})}`

    while(!currentMonthYear.includes(expectedMonthYear)){
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        currentMonthYear = await page.locator('nb-calendar-view-mode').textContent()

    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(newdate.getDate().toString(), {exact:true}).click()
    let dateToAssert = newdate.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})
    await expect(calendarInput).toHaveValue(dateToAssert)
})


test('sliders', async({page}) => {
    // approach 1: update the attribute
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await tempGauge.evaluate(node => {
        node.setAttribute('cx', '100')
        node.setAttribute('cy', '100')
    })

    await tempGauge.click()

    // approach 2: simulate the mouse movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()
    
    const box = await tempBox.boundingBox()
    // place the mouse in the middle of the box as the starting point
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await page.mouse.move(x, y)
    // simulate the pressing down the left button of the mouse
    await page.mouse.down()
    
    await page.mouse.move(x + 100, y)
    await page.mouse.move(x + 100, y + 100)

    // simulate the releasing the left button of the mouse
    await page.mouse.up()

    await expect(tempBox).toContainText('30')

})
