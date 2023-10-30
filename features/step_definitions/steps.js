const { Given, When, Then } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');
const path = require('path');

let browser;
let page;

Given('I am on the login page',  {timeout: 10 * 1000}, async function () {
    browser = await puppeteer.launch({
        executablePath: process.env.CHROME_BIN || null,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    const absolutePath = path.join(__dirname, '../..', 'index.html');
    console.log(absolutePath);
    await page.goto(`file://${absolutePath}`);
});

When('I enter valid credentials', async function () {
    await page.type('#email', 'williangarcias10@gmail.com');
    await page.type('#password', '123456');
    const loginButton = await page.$('input[type="submit"]');
    await loginButton.click();
});

Then('I should be taken to the dashboard', async function () {
    const url = await page.url();
    console.log("URL::");
    console.log(url);
    if (!url.includes('dashboard.html')) {
        throw new Error('Not on the dashboard page');
    }

    await browser.close();
});
