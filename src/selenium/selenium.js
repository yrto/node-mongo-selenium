import { Builder } from "selenium-webdriver";
import { nonConcurrentMapOfLinks } from "./helpers/nonConcurrent.js";
import {
  fetchListOfProductLinks,
  fetchSingleProductInfo,
} from "./helpers/fetchData.js";
import fs from "fs";
import copyDir from "./helpers/copyDir.js";

// gecko driver setup

import firefox from "selenium-webdriver/firefox.js";
let options = new firefox.Options(); // .headless();

// main

const fetchProductDataAndImages = async () => {
  const driver = new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(options)
    .build();
  const links = await fetchListOfProductLinks(driver, "tv samsung", 2);
  const products = await nonConcurrentMapOfLinks(
    driver,
    links,
    fetchSingleProductInfo
  );
  console.log(products);
  await driver.quit();
  // move images
  await copyDir("./src/selenium/downloads", "./src/images");
  // save to file
  fs.writeFileSync(
    "./src/selenium/data/data.json",
    JSON.stringify({ products: products })
  );
};

// main

const main = async () => {
  await fetchProductDataAndImages();
};

main();
