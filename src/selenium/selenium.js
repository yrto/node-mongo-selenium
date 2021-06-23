import { Builder } from "selenium-webdriver";
import { nonConcurrentMapOfLinks } from "./helpers/nonConcurrent.js";
import {
  fetchListOfProductLinks,
  fetchSingleProductInfo,
} from "./helpers/fetchData.js";
import fs from "fs";
import copyDir from "./helpers/copyDir.js";

// gecko driver options

import firefox from "selenium-webdriver/firefox.js";
let options = new firefox.Options(); // .headless();

// fetchProductDataAndImages

const fetchProductDataAndImages = async () => {
  const driver = new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(options)
    .build();
  try {
    const links = await fetchListOfProductLinks(driver, "tv lg", 5);
    const products = await nonConcurrentMapOfLinks(
      driver,
      links,
      fetchSingleProductInfo
    );
    console.log(products);
    // move images
    await copyDir("./src/selenium/downloads", "./src/images");
    // save JSON file with infos
    fs.writeFileSync(
      "./src/selenium/data/data.json",
      JSON.stringify({ products: products })
    );
  } catch (error) {
    console.log(`${error}!`);
  }
  await driver.quit();
};

// main

const main = async () => {
  await fetchProductDataAndImages();
};

main();
