import { test } from '../test-options'


test('submit form', async({formLayoutsPage, pageManager}) => {
    await pageManager.onFormLayoutsPage().submitUsingTheGridForm(process.env.FAKEEMAIL, process.env.FAKEPW, 'Option 2');
    await pageManager.onFormLayoutsPage().submitInlineForm(process.env.FAKEUSERNAME, process.env.FAKEEMAIL, true)
})


