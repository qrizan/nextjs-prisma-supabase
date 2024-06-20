const puppeteer = require('puppeteer');

const targetUrl = 'http://localhost:3000';
const widthResolution = 1280;
const heightResolution = 960;


const selectors = {
  buttonLogin: 'body > main > div > div > a',
  userName: 'body > main > div > div > div > form > div:nth-child(2) > div.flex > div > input',
  password: 'body > main > div > div > div > form > div:nth-child(3) > div.flex > div > input',
  loginButton: 'body > main > div > div > div > form > button > span',
  mainContent: 'body > main > div',
};


const waitForSelectorAndClick = async (
  page: {
    waitForSelector: (arg0: any) => any;
    click: (arg0: any) => any;
  },
  selector: string
) => {
  await page.waitForSelector(selector);
  await page.click(selector);
};

const waitForSelectorAndType = async (
  page: {
    waitForSelector: (arg0: any) => any;
    type: (arg0: any, arg1: any, arg2: { delay: number; }) => any;
  },
  selector: string,
  text: string,
  delay = 0
) => {
  await page.waitForSelector(selector);
  await page.type(selector, text, { delay });
};

const takeScreenshot = async (
  page: {
    goto?: (arg0: any) => any;
    waitForNavigation?: (arg0: { waitUntil: string; }) => any;
    waitForSelector?: any; screenshot?: any;
  },
  path: string
) => {
  await page.waitForSelector(selectors.mainContent);
  await page.screenshot({ path, fullPage: true });
  await new Promise(resolve => setTimeout(resolve, 1000));
};

const navigateAndScreenshot = async (
  page: {
    goto: (arg0: any) => any;
    waitForNavigation: (arg0: { waitUntil: string; }) => any;
  },
  url: string,
  screenshotPath: string
) => {
  await page.goto(url);
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  await takeScreenshot(page, screenshotPath);
};

const testFlowApplication = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  page.setViewport({ width: widthResolution, height: heightResolution, deviceScaleFactor: 1 });

  try {
    await page.goto(targetUrl);

    // Login
    await waitForSelectorAndClick(page, selectors.buttonLogin);
    await waitForSelectorAndType(page, selectors.userName, 'johndoe@mail.com', 200);
    await waitForSelectorAndType(page, selectors.password, 'password', 200);
    await waitForSelectorAndClick(page, selectors.loginButton);

    // Dashboard
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await takeScreenshot(page, './screenshots/test/dashboard.png');

    // Projects
    await navigateAndScreenshot(page, `${targetUrl}/projects`, './screenshots/test/projects.png');
    await navigateAndScreenshot(page, `${targetUrl}/projects/1`, './screenshots/test/detail-project.png');
    await navigateAndScreenshot(page, `${targetUrl}/projects/new`, './screenshots/test/new-project.png');

    // Users
    await navigateAndScreenshot(page, `${targetUrl}/users`, './screenshots/test/users.png');
    await navigateAndScreenshot(page, `${targetUrl}/users/1`, './screenshots/test/detail-user.png');
    await navigateAndScreenshot(page, `${targetUrl}/users/new`, './screenshots/test/new-user.png');

    // Logout
    await page.goto(`${targetUrl}/api/auth/signout?callbackUrl=/`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
};

testFlowApplication().then(() => console.log('Test completed')).catch(console.error);
