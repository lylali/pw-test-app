import { Page, expect } from '@playwright/test'

export class DatepickerPage{
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    // selct one date from the common calendar based on how many days onwards from today
    async selectCommonDatepicker(numOfDaysFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Form Picker');
        await calendarInputField.click();
        const dateToAssert = await this.selectDate(numOfDaysFromToday);
        await expect(calendarInputField).toHaveValue(dateToAssert);
    }

    async selectDatepickerWithRange(startDayFromToday: number, endDayFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Range Picker');
        await calendarInputField.click();
        let dateToAssertStart = await this.selectDate(startDayFromToday);
        let dateToAssertEnd = await this.selectDate(endDayFromToday);
        let dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;
        await expect(calendarInputField).toHaveValue(dateToAssert);
    }

    // create a reusable function for the date picking and call the function inside the page object methods
    private async selectDate(numOfDaysFromToday: number){
        let date = new Date()
        date.setDate(date.getDate() + numOfDaysFromToday)

        let currentMonthYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthYear = `${date.toLocaleString('en-US', {month: 'long'})} ${date.toLocaleString('en-US', {year: 'numeric'})}`

        while(!currentMonthYear.includes(expectedMonthYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            currentMonthYear = await this.page.locator('nb-calendar-view-mode').textContent()

        }

        await this.page.locator('.day-cell.ng-star-inserted').getByText(date.getDate().toString(), {exact:true}).click()
        let dateToAssert = date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})

        return dateToAssert    
    }


}