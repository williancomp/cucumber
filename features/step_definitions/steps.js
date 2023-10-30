const { Given, When, Then } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');

let browser;
let page;

Given('I am on the login page', async function () {
    browser = await puppeteer.launch({
        executablePath: process.env.CHROME_BIN || null,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    
    // Obtém o caminho absoluto do arquivo index.html
    const absolutePath = path.join(__dirname, '..', 'path-to-your-html-folder', 'index.html');
    await page.goto(`file://${absolutePath}`);
});

When('I enter valid credentials', async function () {
    await page.type('#email', 'testuser@example.com'); // Assumindo que o campo de email tem o id "email"
    await page.type('#password', 'testpassword'); // Assumindo que o campo de senha tem o id "password"
    const loginButton = await page.$('button[type="submit"]'); // Assumindo que o botão de login é do tipo "submit"
    await loginButton.click();
});

Then('I should be taken to the dashboard', async function () {
    // Aguarda até que um elemento específico do dashboard seja visível, como uma verificação.
    // Isso pode variar dependendo do que existe na sua página de dashboard.
    await page.waitForSelector('#dashboardElement'); 
    const url = await page.url();
    if (!url.includes('/dashboard')) {
        throw new Error('Not on the dashboard page');
    }

    // Não esqueça de fechar o browser após o teste!
    await browser.close();
});
