import { Builder, By, Key } from "selenium-webdriver";

const fetchProductLinks = async (driver, searchText, arrayLength) => {
  let linkList = [];
  try {
    await driver.get("https://www.magazineluiza.com.br/");
    const searchBar = await driver.findElement(By.id("inpHeaderSearch"));
    await searchBar.sendKeys(searchText, Key.RETURN);
    await driver.sleep(4000);
    const webElementArray = await driver.findElements({
      className: "product-li",
    });
    webElementArray.slice(0, arrayLength).map(async (element) => {
      const link = await element.getAttribute("href");
      linkList.push(link);
    });
    await driver.sleep(2000);
    console.log(linkList);
    return linkList;
  } catch (error) {
    console.log(error);
  }
};

const fetchProductInfo = async (driver, url) => {
  await driver.get(url);
  let productTitle = await driver.findElement(By.css("h1")).getText();
  let productPrice = await driver
    .findElement(By.className("price-template__text"))
    .getText();
  let productInfo = {
    name: productTitle,
    price: productPrice,
  };
  return productInfo;
};

const nonConcurrentMap = async (driver, arr, fn) => {
  const data = [];
  for (let i = 0; i < arr.length; i += 1) {
    const current = arr[i];
    data.push(await fn(driver, current));
  }
  console.log(data);
  return data;
};

const main = async () => {
  const driver = new Builder().forBrowser("firefox").build();
  const links = await fetchProductLinks(driver, "colher", 3);
  await nonConcurrentMap(driver, links, fetchProductInfo);
  await driver.quit();
};

main();
