const { Given, When, Then } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');
const path = require('path');

let browser;
let page;

Given('Estou na página de login',  {timeout: 10 * 1000}, async function () {
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

When('Eu insiro credenciais válidas', {timeout: 10 * 1000}, async function () {
    await page.type('#email', 'williangarcias10@gmail.com');
    await page.type('#password', '123456');
    const loginButton = await page.$('input[type="submit"]');
    await loginButton.click();
    await page.waitForNavigation();
});

Then('Eu deveria ser levado ao dashboard',  {timeout: 10 * 1000}, async function () {
    const url = await page.url();
    if (!url.includes('dashboard.html')) {
        throw new Error('Não está na página do dashboard');
    }

    await browser.close();
});
