import { Builder } from "selenium-webdriver";
import { nonConcurrentMapOfLinks } from "./helpers/nonConcurrent.js";
import {
  fetchListOfProductLinks,
  fetchSingleProductInfo,
} from "./helpers/fetchData.js";
import { copyDir, moveDir } from "./helpers/handleFiles.js";
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
    // move images
    await moveDir("./src/selenium/downloads", "./src/images");
    // save data to JSON file
    await saveDataAsJson("./src/selenium/data/", "data.json", { products });
    // copy JSON file
    await copyDir("./src/selenium/data", "./src/data");
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
