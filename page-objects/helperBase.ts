import { Page } from '@playwright/test' 

export class HelperBase{
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    // customized timeout
    async waitForNumOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds * 1000);
    }

}