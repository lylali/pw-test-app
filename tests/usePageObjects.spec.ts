import { test } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'



test.beforeEach(async ({page}) => {
    await page.goto('/')
})


test('navigate to form page', async({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
})





const fakeFullName = faker.name.fullName();
const fakeEmail = faker.internet.email();
const fakePassword = faker.internet.password();
const inlineFormInputs: [string, string, boolean] = [fakeFullName, fakeEmail, false];
const gridFormInputs: [string, string, string] = [fakeEmail, fakePassword, 'Option 2'];

test('submit form', async({page}) => {
    const pm = new PageManager(page);

    await pm.navigateTo().formLayoutsPage();
    await pm.onFormLayoutsPage().submitUsingTheGridForm(...gridFormInputs);
    await pm.onFormLayoutsPage().submitInlineForm(...inlineFormInputs)
// screenshots and videos

    // partial screenshot
    await page.locator('nb-card', {hasText: 'Inline Form'}).screenshot({path: 'screenshots/inline-form.png'});

    // whole page screenshot
    await page.screenshot({path: 'screenshots/submitted-form.png'});

    // save screenshots into binary

    
})


test('date picker', async({page}) => {
    const pm = new PageManager(page); 

    await pm.navigateTo().datePickerPage();
    await pm.onDatepickerPage().selectCommonDatepicker(20);
    await pm.onDatepickerPage().selectDatepickerWithRange(10, 15);
})

// npm script can be defined in the package.json inside 'script'

// generate random testing dats using faker-js
// 1. install faker-js using: npm i @faker-js/faker@7.6.0 --save-dev --force from cmd (use --save-dev to save it as a dependency)




