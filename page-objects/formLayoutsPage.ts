import { Page } from '@playwright/test'


export class FormLayoutsPage {
    readonly page: Page;
    
    constructor(page: Page){
        this.page = page;

    }

    async submitUsingTheGridForm(
        email: string,
        password: string,
        optionText: string
    ){
        const usingTheGridForm = this.page.locator('nb-card', {hasText: 'Using the Grid'});
        await usingTheGridForm.getByRole('textbox', {name: 'Email'}).fill(email);
        await usingTheGridForm.getByRole('textbox', {name: 'Password'}).fill(password);
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true});
        await usingTheGridForm.getByRole('button').click();
    }


    /**
     * 
     * @param name - should be first and last name
     * @param email - should be valid email address
     * @param rememberMe - true or false the user session should be saved
     */
    async submitInlineForm(
        name: string,
        email: string,
        rememberMe: boolean
    ){
        const inlineForm = this.page.locator('nb-card', {hasText: 'Inline form'});
        await inlineForm.getByPlaceholder('Jane Doe').fill(name);
        await inlineForm.getByPlaceholder('Email').fill(email);
        if (rememberMe){
            await inlineForm.getByRole('checkbox').check({force: true});
        } else{
            await inlineForm.getByRole('checkbox').uncheck()
        }

        await inlineForm.getByRole('button').click()
    }
}