const { Given, When, Then } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');

let browser = null;
let page = null;

Given('I am on the login page', async function () {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('path_to_your_local_html_file', { waitUntil: 'networkidle2' });
});

When('I enter valid credentials', async function () {
    await page.type('#email', 'test@email.com');
    await page.type('#password', 'testpassword');
    await page.click('button[type="submit"]');
});

Then('I should be taken to the dashboard', function () {
    // Aqui você pode verificar a nova URL ou o conteúdo da página para confirmar que o login foi bem-sucedido
    browser.close();
});
