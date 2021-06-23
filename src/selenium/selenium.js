import { Builder } from "selenium-webdriver";
import { nonConcurrentMapOfLinks } from "./helpers/nonConcurrent.js";
import {
  fetchListOfProductLinks,
  fetchSingleProductInfo,
} from "./helpers/fetchData.js";
import copyDir from "./helpers/copyDir.js";
import saveDataAsJson from "./helpers/saveDataAsJson.js";

// gecko driver options

import firefox from "selenium-webdriver/firefox.js";
let options = new firefox.Options(); // .headless();

// fetchProductDataAndImages

const fetchProductDataAndImages = async () => {
  // build browser
  const driver = new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(options)
    .build();
  // try
  try {
    // fetch product links
    const links = await fetchListOfProductLinks(driver, "tv samsung", 3);
    // fetch data, one product at a time
    const products = await nonConcurrentMapOfLinks(
      driver,
      links,
      fetchSingleProductInfo
    );
    // print products
    console.log(products);
    // move images to outside selenium folder
    await copyDir("./src/selenium/downloads", "./src/images");
    // save JSON file with infos
    await saveDataAsJson("./src/selenium/data/", "data.json", { products });
    // catch
  } catch (error) {
    // print errors
    console.log(`${error}!`);
  }
  // close browser
  await driver.quit();
};

// main

const main = async () => {
  await fetchProductDataAndImages();
};

main();
