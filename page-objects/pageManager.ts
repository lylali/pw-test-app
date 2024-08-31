import { Page, expect } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatepickerPage } from '../page-objects/datepickerPage'


export class PageManager{
    private readonly page: Page;

    // create a field for each page
    private readonly navigationPage: NavigationPage;
    private readonly formLayoutsPage: FormLayoutsPage;
    private readonly datepickerPage: DatepickerPage;

    constructor(page: Page){
        // call all the pages and the page fixture inside the constructor
        this.page = page
        // initialize all the page objects
        this.navigationPage = new NavigationPage(this.page);
        this.formLayoutsPage = new FormLayoutsPage(this.page);
        this.datepickerPage = new DatepickerPage(this.page);
    }
    
    // create methods that return all the instances of the page objects
    navigateTo(){
        return this.navigationPage;
    }

    onFormLayoutsPage(){
        return this.formLayoutsPage;
    }

    onDatepickerPage(){
        return this.datepickerPage;
    }
}