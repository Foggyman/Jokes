const timeout = 5000

describe(
    '/ (Home Page)',
    () => {
        let page = null;
        beforeAll(async () => {
            page = await global.__BROWSER__.newPage();
            await page.setViewport({ width: 1280, height: 800 });
            await page.goto('http://localhost:8080');
        }, timeout)

        afterAll(async () => {
            await page.close()
        }) 

        it('should load without error', async () => {
            await expect(page.title()).resolves.toMatch('Jokes');
        });

        it('page title should be visible and be Jokes', async () => {
            await expect(page.$eval('h1', el => el.innerText)).resolves.toMatch("Jokes");
        });

        it('should be able to take a screenshot: homeScreenshot.png', async () => {
            const screenshot = await page.screenshot({ path: 'homeScreenshot.png', fullPage: true });
            expect(screenshot).not.toBeNull();
            expect(screenshot).toBeDefined();
            expect(screenshot.length).toBeGreaterThan(0);
        });
    },
    timeout
)