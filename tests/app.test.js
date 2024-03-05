const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

let options = new chrome.Options();
options.addArguments(
    '--headless', // corrected the headless argument
    '--no-sandbox',
    '--disable-dev-shm-usage'
);

describe("add note", function() {
    it("should add a note and display on the page", async function() {
        let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        try {
            await driver.get('http://localhost:3000');
            await driver.findElement(By.xpath('//input')).sendKeys('Hello Selenium', Key.RETURN);

            // Warte, bis die Note angezeigt wird
            await driver.wait(until.elementLocated(By.xpath("//*[@id='root']/div/div")), 5000);

            let note = await driver.findElement(By.xpath("//*[@id='root']/div/div")).getText();
            console.log({ note });
            assert.equal(note, 'Hello Selenium\nX');
            console.log("TEST PASSED!");
        } catch (e) {
            console.error(e);
            assert.fail(e); // Bei einem Fehler 'assert.fail' aufrufen, um den Test zu markieren
        } finally {
            await driver.quit();
        }
    });
});
