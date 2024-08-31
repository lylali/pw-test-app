import {test as base} from '@playwright/test'
import { PageManager } from './page-objects/pageManager'

export type TestOptions = {
    globalSqaURL: string;
    // a new TestOptions type
    formLayoutsPage: string;
    pageManager: PageManager;
}

export const test = base.extend<TestOptions>({
    globalSqaURL: ['', {option: true}],
    // create a new fixture
    formLayoutsPage: async({page}, use, testInfo) => {
        await page.goto('/');
        if (testInfo.project.name === 'mobile') {
            await page.locator('.sidebar-toggle').click();
        }
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
        if (testInfo.project.name === 'mobile') {
            await page.locator('.sidebar-toggle').click();
        }
        await use('')
        console.log('Tear Down')
    },

    pageManager: async({page}, use) => {
        const pm = new PageManager(page);
        await use(pm);
    }

})

// inside config file import TestOptions