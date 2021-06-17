import { Builder, By, Key, until } from "selenium-webdriver";

const main = async () => {
  const driver = new Builder().forBrowser("firefox").build();
  try {
    await driver.get("https://google.com");
    const myElement = await driver.findElement(By.name("q"));
    await myElement.sendKeys("webdriver", Key.RETURN);
    await driver.wait(until.titleIs("webdriver - Google Search"), 5000);
  } catch (error) {
    console.log(error);
  } finally {
    await driver.quit();
  }
};

main();
